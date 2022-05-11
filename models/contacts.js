const fs = require('fs/promises')
const path = require("path")


const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  return fs.readFile(contactsPath)
    .then((response) => {
      const stringData = response.toString();
      const objectData = JSON.parse(stringData);
      return objectData
    })
    .catch((error) => console.log(error));
}

const getContactById = async (contactId) => {
  return listContacts()
    .then((response) => {
      const foundContact = response.find(
        (contact) => contact.id === contactId
      );
      if (foundContact) return foundContact;
    })
    .catch((error) => console.log(error));
}

const removeContact = async (contactId) => {
  return listContacts()
    .then(async (response) => {
      const newArray = response.filter(
        (contact) => contact.id !== contactId
      );
      // porządkowanie id dla skróconej bazy kontaktów, w kolejności rosnacej
      const elements = newArray.length;
      for (let i = 0; i < elements; i++) {
        newArray[i].id = i + 1;
      }
      //zmiana zawartości pliku
      stringArray = JSON.stringify(newArray);
      await fs.writeFile(contactsPath, stringArray)
      if (response.toString() !== newArray.toString()) return true;
    })
    .catch((error) => console.log(error));
}

const addContact = async (body) => {
  listContacts()
    .then((response) => {
      const contact = { id: 0, name: body.name, email: body.email, phone: body.phone };
      response.push(contact);
      // porządkowanie id dla zwiększonej bazy kontaktów, w kolejności rosnacej
      const elements = response.length;
      for (let i = 0; i < elements; i++) {
        response[i].id = i + 1;
      }
      //zmiana zawartości pliku
      stringArray = JSON.stringify(response);
      fs.writeFile(contactsPath, stringArray);
    })
    .catch((error) => console.log(error));
}

const updateContact = async (contactId,body) => {
  listContacts().then(response => {
    const contact = { id: contactId, name: body.name, email: body.email, phone: body.phone };
    const foundContact = response.find(element => element.id === contactId);
    response.splice(contactId - 1, 1, contact);
    stringArray = JSON.stringify(response);
    fs.writeFile(contactsPath, stringArray);
    if (foundContact) return true;
  })
  .catch((error) => console.log(error));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
