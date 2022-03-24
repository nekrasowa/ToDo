const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://Ludmila:zk%2E%2Ck%2Ezjq69@cluster0.wwhjo.mongodb.net/konoha?retryWrites=true&w=majority";
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const dbName = "konoha"


async function run() {
  try {
      await client.connect();
      console.log("Connected correctly to server");

      const db = client.db(dbName);

      const col = db.collection("people");
      // let personDocument = {
      //   "name": { "first": "Sasuke", "last": "Uchiha" },
      //   "birth": new Date(1912, 6, 25), // May 23, 1912                                                                                                                                 
      //   "death": new Date(1954, 4, 9),  // May 7, 1954                                                                                                                                  
      //   "contribs": [ "oooups machine", "ech test", "tup" ],
      //   "views": 1250000
      // }
      // const p = await col.insertOne(personDocument)
      const myDoc = await col.findOne({ "first": "Sasuke"});
      console.log(myDoc);

  } catch (err) {
      console.log(err.stack);
  }
  finally {
      await client.close();
  }
}
run().catch(console.dir);

// const cursor = konoha.collection('inventory').find({ item: 'canvas' });
// console.log(cursor)

