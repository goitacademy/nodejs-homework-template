const { randomUUID } = require('crypto')
const fs = require('fs/promises')
const path = require ('path')

const contactPath = path.resolve ("contacts.json")

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactPath, 'utf-8')
    const results = await JSON.parse(data)
    await console.table (results)
  } catch (error) {
    console.log(error.message)
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactPath, "utf-8")
    const results = await JSON.parse(data)
    const findContact = await results.find ((contact) => Number(contact.id) === contactId)
  } catch (error) {
    console.log(error.message);
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactPath, "utf-8")
    const results = await JSON.parse(data)
    const deleteContact = await results.find((contact) => Number(contact.id) === contactId)

    if (deleteContact) {
      const index = results.indexOf(deleteContact)
      results.splice(index, 1)
      await fs.writeFile(contactPath, JSON.stringify(results), "utf-8")
      console.log("User has been remove");
    } else { 
      return console.log("User were not found");
    }
  } catch (error) {
    console.log(error.message);
  }
}

const addContact = async (body) => {
  try {
    const data = await fs.readFile(contactPath, "utf-8")
    const results = await JSON.parse(data)
    const id = randomUUID()

    const { name, email, phone} = body
    const updateContact = [...results, body]
    await fs.writeFile(contactPath, JSON.stringify(updateContact), "utf-8")
    await console.log("User has been added");
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
