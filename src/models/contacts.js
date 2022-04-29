const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");
// console.log('contactsPath', contactsPath)

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find(
      (contact) => contact.id === String(contactId)
    );
    return contactById;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const newContacts = contacts.filter(
      (obj) => obj.id !== String(contactId)
    );
   return fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
   
    const nextIdNumber = Number(contacts[contacts.length - 1].id) + 1;
console.log('nextIdNumber', nextIdNumber)
// console.log(name, email, phone)
    const newContact = {
      id: String(nextIdNumber),
      name: name,
      email: email,
      phone: phone,
    };

    contacts.push(newContact);
    console.log('contacts', contacts)

    fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.error(error.message);
  }
};

const putContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const parseContacts = JSON.parse(contacts);

    const changeContact = {
      id: contactId,
      name: body.name,
      email: body.email,
      phone: body.phone,
    };

    parseContacts.filter((el) => el.id !== contactId).push(changeContact);

    fs.writeFile(contactsPath, JSON.stringify(parseContacts), (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const parseContacts = JSON.parse(contacts);

    parseContacts.forEach((contact) => {
      if (contact.id === contactId) {
        if (body.username) {
          contact.username = body.username;
        }
        if (body.email) {
          contact.email = body.email;
        }
        if (body.phone) {
          contact.phone = body.phone;
        }
      }
    });

    fs.writeFile(contactsPath, JSON.stringify(parseContacts), (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  putContact,
  updateContact,
};

// {
//   "id": "2",
//   "name": "Chaim Lewis",
//   "email": "dui.in@egetlacus.ca",
//   "phone": "(294) 840-6685"
// }