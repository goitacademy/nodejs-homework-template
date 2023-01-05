const fs = require('fs/promises')
const path = require ('path')
const { randomUUID } = require('crypto')

const contactPath = path.resolve("./models/contacts.json")

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactPath, 'utf-8')
    const results = await JSON.parse(data)
    return results
  } catch (error) {
    console.log(error.message)
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactPath, "utf-8")
    const results = await JSON.parse(data)
    const findContact = await results.find((contact) => String(contact.id) === contactId)
    return findContact
  } catch (error) {
    console.log(error.message);
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactPath, "utf-8")
    const results = await JSON.parse(data)
    const deleteContact = await results.find((contact) => String(contact.id) === contactId)

    if (deleteContact) {
      const index = results.indexOf(deleteContact)
      results.splice(index, 1)
      await fs.writeFile(contactPath, JSON.stringify(results), "utf-8")
      return deleteContact
    }
     return console.log("User were not found");
  } catch (error) {
    console.log(error.message);
  }
}

const addContact = async (body) => {
  try {
    const data = await fs.readFile(contactPath, "utf-8")
    const results = await JSON.parse(data)
    const id = randomUUID()

    const newContact = {
      id,
      ...body
    }
    const updateContact = [...results, body]
    await fs.writeFile(contactPath, JSON.stringify(updateContact), "utf-8")
    return newContact
  } catch (error) {
    console.log(error.message);
  }
}

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactPath, "utf-8")
    const results = await JSON.parse(data)
    const findContact = results.findIndex((contact) => Number(contact.id) === contactId)
    const { name, email, phone } = body
    
    if (findContact !== -1) { 
      results[findContact].name = name
      results[findContact].email = email
      results[findContact].phone = phone
      await fs.writeFile(contactPath, JSON.stringify(results))
      return results[findContact]
    }
  } catch (error) {
   console.log(error.message); 
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
