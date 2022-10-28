const { ObjectId } = require("mongoose").Types;
const Contact = require("./schemas/contacts");

const getAllContacts = () => Contact.find({}).lean();

const getSingleContact = (contactId) => {
  let objectIdContact;
  try {
    objectIdContact = ObjectId(contactId);
  } catch (err) {
    return null;
  }

  return Contact.findOne({ _id: objectIdContact }).lean();
};

const createContact = (body) => Contact.create(body);

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
};
