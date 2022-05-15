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

const addContact = ({ name, email, phone, favorite }) =>
  Contact.create({ name, email, phone, favorite });

const removeContact = (contactId) => Contact.deleteOne({ _id: contactId });

const updateContact = (contactId, contactToUpdate) =>
  Contact.findOneAndUpdate(
    {
      _id: contactId,
    },
    { $set: contactToUpdate },
    {
      new: true,
      runValidators: true,
      strict: "throw",
    }
  );

const updateStatusContact = (contactId, body) =>
  Contact.findOneAndUpdate(
    {
      _id: contactId,
    },
    { $set: body },
    {
      new: true,
      runValidators: true,
      strict: "throw",
    }
  );

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateStatusContact,
};
