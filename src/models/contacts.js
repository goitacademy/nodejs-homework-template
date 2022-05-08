const { Contacts } = require("../db/contactsModel");

const listContacts = async () => {
  try {
    const contacts = await Contacts.find();
    console.log("contacts", contacts);
    return contacts;
  } catch (error) {
    console.error(error.message);
  }
};


const getContactById = async (contactId) => {
  try {
    const contactById = await Contacts.findOne({ _id: contactId });
    return contactById;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    //     const contacts = await listContacts();
    const contact = Contacts.findByIdAndRemove({ _id: contactId });
    return contact;
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (name, email, phone,favorite) => {
  try {
    const newContact = Contacts.create({ name, email, phone,favorite });
    return newContact;
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const updateContactItem = Contacts.findByIdAndUpdate(
      { _id: contactId },
      body,
      { new: true }
    );
    return updateContactItem;
    // const contacts = await listContacts();
    // const { name, email, phone } = body;
    // const contactsNew = [];
    // let updateContactItem = {};

    // contacts.forEach((contact) => {
    //   if (contact.id === String(contactId)) {
    //     if (name) {
    //       contact.name = name;
    //     }
    //     if (email) {
    //       contact.email = email;
    //     }
    //     if (phone) {
    //       contact.phone = phone;
    //     }
    //     updateContactItem = contact;
    //   }
    //   contactsNew.push(contact);
    // });
    // fs.writeFile(contactsPath, JSON.stringify(contactsNew), (err) => {
    //   if (err) throw err;
    // });
    // return updateContactItem;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
