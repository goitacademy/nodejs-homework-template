const fs = require("fs/promises");
const path = require("path");
const { nextTick } = require("process");
const contacts = require("./contacts.json");

const contactsPath = path.resolve(__dirname, './contacts.json');;

const listContacts = async () => {
  let list;
  try{
    await fs
    .readFile(contactsPath, "utf8")
    .then((data) => {
      list = JSON.parse(data); 
    })}
   catch (error) {
    console.error(error);
  }
    return list;
    
};

const getContactById = async (contactId) => {
  try {
    let findContact;
    const allContacts = await listContacts();
    findContact = await allContacts.filter(
      (currentContact) => currentContact.id == contactId
    );
    return findContact;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    let newListAfterRemove;
    let removeStatus = false;
    const allContacts = await listContacts();
    newListAfterRemove = allContacts.filter(
      (currentContact) => currentContact.id !== contactId
    );
    if (allContacts.length > newListAfterRemove.length) {
      removeStatus = true;
      await fs.writeFile(contactsPath, JSON.stringify(newListAfterRemove));
    }
    return removeStatus;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  try {
    const allContacts = await listContacts();
    let newContact = {
      id: new Date().getTime().toString(),
      name: name,
      email: email,
      phone: phone,
    };
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return newContact;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  try {
    let updatedContacts;
    let contactAfterUpdate;
    const allContacts = await listContacts();
    updatedContacts = await allContacts.map((currentContact) => {
      if (currentContact.id == contactId) {
        if (name) {
          currentContact.name = name;
        }
        if (email) {
          currentContact.email = email;
        }
        if (phone) {
          currentContact.phone = phone;
        }
        contactAfterUpdate = currentContact;
        return contactAfterUpdate;
      } else {return currentContact}
    });
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return contactAfterUpdate;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
