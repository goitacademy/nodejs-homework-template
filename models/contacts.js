const fs = require('fs/promises')
const path = require("node:path")
const { v4: uuidv4 } = require('uuid')

const listContacts = async () => {
  const pathContacts = path.join(__dirname, "contacts.json");
return fs.readFile(pathContacts)
  .then((data) => {
      return JSON.parse( data )
  })
  .catch((error) => {
    console.log(error.message);
  });
}

const getContactById = async (contactId) => {
  const pathContacts = path.join(__dirname, "contacts.json");
  return await fs.readFile(pathContacts)
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
  const pathContacts = path.join(__dirname, "contacts.json");
  fs.readFile(pathContacts)
    .then((data) => {
      const contacts = JSON.parse(data.toString());
      const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
      const updatedData = JSON.stringify(updatedContacts, null, 2);
      fs.writeFile(pathContacts, updatedData);
      console.log(`Contact with ID ${contactId} removed successfully.`);
    })
    .catch((error) => {
      console.log("error:");
      console.log(error.message);
    });
}

const addContact = async (body) => {
  const pathContacts = path.join(__dirname, "contacts.json");
fs.readFile(pathContacts)
  .then((data) => {
    const contacts = JSON.parse(data.toString());
    const newContact = {
      id: uuidv4(),
      name: body.name,
      email: body.email,
      phone: body.phone,
    };
    contacts.push(newContact);
    const updatedData = JSON.stringify(contacts, null, 2);
    fs.writeFile(pathContacts, updatedData)
      .then(() => {
        console.log(`Contact added successfully: ${JSON.stringify(newContact)}`);
      })
  })
}

const updateContact = async (contactId, body) => {
  const pathContacts = path.join(__dirname, "contacts.json");
  fs.readFile(pathContacts)
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
    fs.writeFile(pathContacts, updatedData)
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
