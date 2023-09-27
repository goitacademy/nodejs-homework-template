const { Contact } = require("./contacts.model")


const listContacts = async () => {
  try {
    return await Contact.find();
  } catch (err) {
    console.error(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

const addContact = async (body) => {
  try {
    const newContact = new Contact(body);
    const saveContact = await newContact.save();
    return saveContact;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};
 
const removeContact = async (contactId) => {
  try {
    await Contact.findByIdAndDelete(contactId);
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    return updatedContact;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    const { favorite } = body;
    return await updateContact(contactId, { favorite });
  } catch (err) {
    console.log(err.message);
    return null;
  }
};


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
