const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const dbName = 'ToDo'

const run = async () => {
  try {
    await client.connect()
    console.log('[1]')
    const db = await client.db(dbName)

    const notesCol = await db.collection('notes')
  
    console.log('[insert-res]:', res)
    const note = await notesCol.findOne({id: 'note-1'})
    console.log('[note]:', note)
  } catch (err) {
    console.log(err)
  }
}

run()