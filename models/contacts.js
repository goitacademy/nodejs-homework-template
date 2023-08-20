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

const removeContact = async (contactId) => {
  const contactsPath = path.format({
    root: "C:UsersUserDocumentsGitHubGRUPA-11-nodejs-homework-template",
    dir: "models",
    base: "contacts.json",
  });
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data.toString());
      const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
      const updatedData = JSON.stringify(updatedContacts, null, 2);
      fs.writeFile(contactsPath, updatedData)
        .then(() => {
          console.log(`Contact with ID ${contactId} removed successfully.`);
        })
        .catch((error) => {
          console.log("error:");
          console.log(error.message);
        });
    })
    .catch((error) => {
      console.log("error:");
      console.log(error.message);
    });
}

const addContact = async (name, email, phone) => {
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
      name: name,
      email: email,
      phone: phone,
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

const updateContact = async (contactId, body) => {
  const contactsPath = path.format({
    root: "C:UsersUserDocumentsGitHubGRUPA-11-nodejs-homework-template",
    dir: "models",
    base: "contacts.json",
  });
  fs.readFile(contactsPath)
  .then((data) => {
    let contacts = JSON.parse(data.toString());
    contacts = contacts.filter((contact) => contact.id !== contactId);
     const newContact = {
       id: contactId,
       name: body.name,
       email: body.email,
       phone: body.phone,
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

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
