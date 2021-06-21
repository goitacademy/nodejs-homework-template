const path = require('path')

const fs = require('fs').promises
const contactsPath = path.resolve('model/contact.json')
const MongoClient = require('mongodb').MongoClient

const connectFunction = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    const db = client.db()
    return db.collection('notebook')
  } catch (err) {
    console.error(err)
  }
}

const listContacts = async () => {
  try {
    // const data = await fs.readFile(contactsPath, 'utf8')
    const Notebook = await connectFunction()
    const contacts = await Notebook.find({}).toArray()
    return contacts
  } catch (err) {
    console.error(err)
  }
}

async function getContactById(contactId) {
  try {
    // const data = await fs.readFile(contactsPath, 'utf8')
    // const contacts = JSON.parse(data)
    // const contactToFind = contacts.find(contact => contact.id === contactId)
    // return contactToFind
    const Notebook = await connectFunction()

    const contact = await Notebook.find({ id: contactId }).toArray()
    return contact
  } catch (err) {
    console.error(err)
  }
}
async function addContact(name, email, phone) {
  try {
    const Notebook = await connectFunction()
    const contacts = await Notebook.find({}).toArray()
    const idArray = contacts.map(contact => contact.id)
    const id = idArray.reduce((accum, id) => {
      if (id > accum) {
        accum = id
      }
      return accum + 1
    })
    await Notebook.insertOne({ id, name, email, phone })
    return { id, name, email, phone }
  } catch (err) {
    console.error(err)
  }
}

async function removeContact(contactId) {
  try {
    const Notebook = await connectFunction()
    const deleteContact = await Notebook.deleteOne({ id: contactId })

    return !!deleteContact.result.n
  } catch (err) {
    console.error(err)
  }
}
const updateContact = async (name, email, phone, id) => {
  try {
    // const contacts = await fs.readFile(contactsPath, 'utf8')
    // const contactsAfterChange = JSON.parse(contacts).map(contact => {
    //   if (contact.id === id) {
    //     contact.name = name
    //     contact.email = email
    //     contact.phone = phone
    //   }
    //   return contact
    // })
    // await fs.writeFile(
    //   contactsPath,
    //   JSON.stringify(contactsAfterChange),
    //   'utf8',
    // )
    const Notebook = await connectFunction()
    const addContact=await Notebook.updateOne({ id }, {$set {name, email, phone}})
    return addContact
  } catch (err) {
    console.error(err)
  }
}
module.exports = {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
}
