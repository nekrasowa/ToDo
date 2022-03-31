async function placeOrder(client, cart, payment) {
  const transactionOptions = {
    readConcern: { level: 'snapshot' },
    writeConcern: { w: 'majority' },
    readPreference: 'primary'
  };

  const session = client.startSession();
  try {
    session.startTransaction(transactionOptions);

    const ordersCollection = client.db('testdb').collection('orders');
    const orderResult = await ordersCollection.insertOne(
      {
        customer: payment.customer,
        items: cart,
        total: payment.total,
      },
      { session }
    );

    const inventoryCollection = client.db('testdb').collection('inventory');
    for (let i=0; i<cart.length; i++) {
      const item = cart[i];

      // Cancel the transaction when you have insufficient inventory
      const checkInventory = await inventoryCollection.findOne(
        {
          sku: item.sku,
          qty: { $gte: item.qty }
        },
        { session }
      )
      if (checkInventory === null) {
        throw new Error('Insufficient quantity or SKU not found.');
      }

      await inventoryCollection.updateOne(
        { sku: item.sku },
        { $inc: { 'qty': -item.qty }},
        { session }
      );
    }

    const customerCollection = client.db('testdb').collection('customers');
    await customerCollection.updateOne(
      { _id: payment.customer },
      { $push:  { orders: orderResult.insertedId }},
      { session }
    );
    await session.commitTransaction();
    console.log('Transaction successfully committed.');

  } catch (error) {
    if (error instanceof MongoError && error.hasErrorLabel('UnknownTransactionCommitResult')) {
      // add your logic to retry or handle the error
    }
    else if (error instanceof MongoError && error.hasErrorLabel('TransientTransactionError')) {
      // add your logic to retry or handle the error
    } else {
      console.log('An error occured in the transaction, performing a data rollback:' + error);
    }
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
}