import fs from 'fs/promises'
import path from 'path'
import crypto from 'node:crypto'
import { nanoid } from 'nanoid'


const FILE_PATH = path.resolve('models', 'contacts.json')

async function read() {
  const data = await fs.readFile(FILE_PATH, {encoding: "utf-8"})
  return JSON.parse(data)
}

async function write(data) {
  fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2))
}

const listContacts = async () => {
  const data = await read()
  return data
}

const getContactById = async contactId => {
  const data = await read()
  return data.find((book) => book.id === contactId) 
}

const removeContact = async (contactId) => {
 const data = await read()

  const index = data.findIndex(book => book.id === contactId)

  if(index === -1) {
    return undefined
  }

  const newBooks = [
    ...data.slice(0, index), 
    ...data.slice(index + 1)
  ]
  await write(newBooks)
  return data[index]
}



const addContact = async ({name, email, phone}) => {    
  const data = await read()
  const newBook = {
    id: nanoid(),
    name,
    email,
    phone,   
  }
  data.push(newBook)
  await write(data)
  return newBook
}


const updateContactById = async (contactId, {name, email, phone}) => {
  const contacts = await read()
  const index = contacts.findIndex(item => item.id === contactId)

  if(index === -1) {
    return null;
  }
  contacts[index] = {contactId, name, email, phone}
  
  await fs.writeFile(FILE_PATH, JSON.stringify(contacts, null, 2))

  return contacts[index]
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById
}
