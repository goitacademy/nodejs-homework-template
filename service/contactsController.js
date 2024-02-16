const Contact = require("./Schemas/contactSchema");

const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactToFind = await Contact.findOne({ _id: contactId });
    return contactToFind;
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactToDelete = await Contact.findByIdAndDelete({ _id: contactId });
    return contactToDelete;
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async (body) => {
  try {
    const newContact = await Contact.create(body);
    return newContact;
  } catch (err) {
    console.log(err.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contactToUpdate = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    return contactToUpdate;
  } catch (err) {
    console.log(err.message);
  }
};

const updateStatusContact = async (contactId, body) => {
  const { favorite } = body;
  try {
    const contactToUpdate = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      }
    );
    return contactToUpdate;
  } catch (err) {
    console.log(err.message);
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
