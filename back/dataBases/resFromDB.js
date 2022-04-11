const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const dbName = 'ToDo'

async function addArrOfOldNotes() {
  try {
    await client.connect()
    console.log('[connect]:')

    const db = await client.db(dbName)
    const notesCol = await db.collection('notes')
    const cursor = await notesCol.find({})
    const allNotes = await cursor.toArray()

    await client.close()
    // console.log('[allNotesMDB]', allNotes)

    return allNotes

  } catch (err) {
    console.log(err)
    throw err
  }
}

async function getAllId() {
  try {
    await client.connect()
    console.log('[connect]:')

    const db = client.db(dbName)
    const notesCol = db.collection('notes')

    const options = {
      sort: {},
      projection: { id: 1, _id: 0 },
    }
    const cursor = await notesCol.find({}, options)
    const allIdArr = [0]

    await cursor.forEach(doc => {
      const arr = Object.values(doc)
      const id = arr[0]
      const clearId = Number(id.slice(5))      
      allIdArr.push(clearId)
      })

    await client.close()

    return allIdArr

  } catch (err) {
    console.log(err)
    throw err
  }
}

async function deleteElById(noteId) {
  try {
    await client.connect()
    console.log('[connect]:')

    const db = await client.db(dbName)
    const notesCol = await db.collection('notes')
    const deletedNote = await notesCol.findOneAndDelete({id: noteId});
    // const allNotes = await cursor.toArray();
    await client.close()
    console.log(deletedNote)

    return deletedNote

  } catch (err) {
    console.log(err)
    throw err
  }
}

async function addNewNote(JSONobjOfNote) {
  try {
    await client.connect()

    console.log('[connect]:')

    const db = client.db(dbName)
    const notesCol = db.collection('notes')
    console.log('[JSONobjOfNote]', JSONobjOfNote)
    const addedNote = await notesCol.insertOne(JSONobjOfNote);
    // const allNotes = await cursor.toArray();
    await client.close()
    console.log('[addedNote]', addedNote)

    return addedNote.acknowledged

  } catch (err) {
    console.log(err)
    throw err
  }
}

module.exports = {
  addArrOfOldNotes,
  getAllId,
  deleteElById,
  addNewNote
}
