const {
  Types: { ObjectId },
} = require("mongoose");
const Contact = require("./schemas/contacts");

const listContacts = () => Contact.find({}).lean();

const getContactById = (contactId) => {
  let objectIdContactId;
  try {
    objectIdContactId = ObjectId(contactId);
  } catch (err) {
    return null;
  }
  return Contact.findOne({ _id: objectIdContactId }).lean();
};

const addContact = ({ name, email, phone, favorite }) => {
    Contact.create({ name, email, phone, favorite } );
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
};
