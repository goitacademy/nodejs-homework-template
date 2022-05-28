const {
  Types: { ObjectId },
} = require("mongoose");
const Contact = require("./schemas/contacts");

const listContacts = (owner) => Contact.find({owner}).lean();

const getContactById = (contactId,id) => {
  let isValid;
  try {
    isValid = ObjectId(contactId);
  } catch (err) {
    return null;
  }
  return Contact.findOne({owner:id, _id: isValid }).lean();
};

const addContact = ({ name, email, phone, favorite, owner }) =>
  Contact.create({ name, email, phone, favorite, owner });

const removeContact = (contactId,id) => Contact.deleteOne({owner: id, _id: contactId });

const updateContact = (contactId, contactToUpdate, id) =>
  Contact.findOneAndUpdate(
    {
      owner: id,
      _id: contactId,
    },
    { $set: contactToUpdate },
    {
      new: true,
      runValidators: true,
      strict: "throw",
    }
  );

const updateStatusContact = (contactId, body, id) =>
  Contact.findOneAndUpdate(
    {
      owner: id,
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
  updateContact,
  removeContact,
  updateStatusContact,
};
