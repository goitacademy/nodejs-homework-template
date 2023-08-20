const fs = require('fs/promises')
const path = require("node:path")
const { v4: uuidv4 } = require('uuid')

const listContacts = async () => {
  const contactsPath = path.format({
  root: "C:UsersUserDocumentsGitHubGRUPA-11-nodejs-homework-template",
  dir: "models",
  base: "contacts.json",
});
return await fs.readFile(contactsPath)
  .then((data) => {
      return JSON.parse( data )
  })
  .catch((error) => {
    console.log("error:");
    console.log(error.message);
  });

}

const getContactById = async (contactId) => {
  const contactsPath = path.format({
    root: "C:UsersUserDocumentsGitHubGRUPA-11-nodejs-homework-template",
    dir: "models",
    base: "contacts.json",
  });
  return await fs.readFile(contactsPath)
  .then((data) => {
    data = JSON.parse(data)
    data = data.filter(el=>
      el.id===contactId
    )
    return data
})
.catch((error) => {
  console.log("error:");
  console.log(error.message);
});
}

const removeContact = async (contactId) => {}

const addContact = async (body) => {
  const contactsPath = path.format({
    root: "C:UsersUserDocumentsGitHubGRUPA-11-nodejs-homework-template",
    dir: "models",
    base: "contacts.json",
  });
fs.readFile(contactsPath)
  .then((data) => {
    const contacts = JSON.parse(data.toString());
    const newContact = {
      id: uuidv4(),
      name: body[0],
      email: body[1],
      phone: body[2],
    };
    contacts.push(newContact);
    const updatedData = JSON.stringify(contacts, null, 2);
    fs.writeFile(contactsPath, updatedData)
      .then(() => {
        console.log(`Contact added successfully: ${JSON.stringify(newContact)}`);
      })
      .catch((error) => {
        console.log("error:");
        console.log(error.message);
      });
  })
  .catch((error) => {
    console.log("error:");
    console.log(error.message);
  });}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
