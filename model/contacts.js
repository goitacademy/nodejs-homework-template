const fs = require('fs/promises')
const path = require('path')
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
    const contacts = await listContacts()
    return  contacts.find((item)=>item.id.toString()=== id)
  } catch (error) {
    console.log(error)
  }
  
}

const removeContact = async (id) => {
  try {
    const contacts = await listContacts()
    // const contacts = await fs.readFile(contactsPath).then((data)=>JSON.parse(data))
    const newContacts = contacts.filter((item)=>item.id.toString()!== id)
    const string = JSON.stringify(newContacts, null ,2)
    try {
      await fs.writeFile(contactsPath, string)
    } catch (error) {
       console.log(error)
    }
    return newContacts
  } catch (error) {
    console.log(error)
  }
  
}


const addContact = async (body) => {
   try {
    const contacts = await listContacts()
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

const updateContact = async (id, body) => {
  try {
    const contacts = await listContacts()
      const record = contacts.find((item)=>item.id.toString()=== id)
      Object.assign(record,body)
      const string = JSON.stringify(contacts, null ,2)
    try {
      await fs.writeFile(contactsPath, string)
    } catch (error) {
       console.log(error)
    }
      return record.id ? record : null  
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
