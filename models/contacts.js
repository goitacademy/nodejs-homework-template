const fs = require('fs/promises');
const path = require("path");

const { v4: uuidv4 } = require('uuid');

const listContacts = async () => {
  try {
    const data = await fs.readFile(path.join(__dirname, "contacts.json"))
    const parsedData = JSON.parse(data)
    return parsedData;
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(path.join(__dirname, "contacts.json"))
    const parsedData = JSON.parse(data)
    const filteredData = parsedData.filter(contact => contact.id === contactId)

    return filteredData;
  } catch (error) {
    console.log(error)
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(path.join(__dirname, "contacts.json"))
    const parsedData = JSON.parse(data);
    const index = parsedData.findIndex(contact => contact.id === contactId)
    if (index === -1) {
      return false;
    }
    const newArray = parsedData.filter(contact => contact.id !== contactId)
    await fs.writeFile(path.join(__dirname, "contacts.json"), JSON.stringify(newArray))
    return true;
  } catch (error) {
    console.log(error)
  }

}

const addContact = async (body) => {
  try {
    const data = await fs.readFile(path.join(__dirname, "contacts.json"))
    const parsedData = JSON.parse(data)
    const newContact = { ...body, id: uuidv4() }
    parsedData.push(newContact)
    fs.writeFile(path.join(__dirname, "contacts.json"), JSON.stringify(parsedData))
    return newContact;
  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(path.join(__dirname, "contacts.json"))
    const parsedData = JSON.parse(data);
    const index = parsedData.findIndex(contact => contact.id === contactId);
    if (index === -1) {
      return false;
    }
    const findContact = parsedData.filter(contact => contact.id === contactId)
    const changedContact = { ...findContact[0], ...body }
    parsedData.splice(index, 1, changedContact)
    await fs.writeFile(path.join(__dirname, "contacts.json"), JSON.stringify(parsedData))
    return changedContact;
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
