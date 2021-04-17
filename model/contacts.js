const fs = require('fs/promises')
const path = require('path')
// const contacts = require('../model/contacts.json')
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, '..', 'model', 'contacts.json');
console.log(contactsPath);

const listContacts = async () => {
  try {
    return await fs.readFile(contactsPath).then((data)=>JSON.parse(data))
  } catch (error) {
    console.log(error)
  }
  
}

const getContactById = async (id) => {
  try {
    const contacts = await fs.readFile(contactsPath).then((data)=>JSON.parse(data))
    return  contacts.find((item)=>item.id.toString()=== id)
  } catch (error) {
    console.log(error)
  }
  
}

const removeContact = async (id) => {
  // try {
  //   const contacts = await fs.readFile(contactsPath).then((data)=>JSON.parse(data))

  //   return  contacts.filter((item)=>item.id.toString()!== id)
  // } catch (error) {
  //   console.log(error)
  // }
  
}

const addContact = async (body) => {
   try {
    const contacts = await fs.readFile(contactsPath).then((data)=>JSON.parse(data))
    const id = uuidv4()
    const recordContact = {
      id,
      ...body
    }
    contacts.push(recordContact)
    const string = JSON.stringify(contacts, null ,2)
    try {
      await fs.writeFile(contactsPath, string)
    } catch (error) {
       console.log(error)
    }
    return recordContact
  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
