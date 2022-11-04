const { ObjectId } = require("mongoose").Types;
const Contact = require("../models/contact");

const getAllContacts = async () => await Contact.find({}).lean();

const getSingleContact = async (contactId) => {
  let objectIdContact;
  try {
    objectIdContact = ObjectId(contactId);
  } catch (err) {
    return null;
  }

  return await Contact.findOne({ _id: objectIdContact }).lean();
};

const createContact = async (body) => await Contact.create(body);

const deleteContact = async (contactId) => {
  let objectIdContact;
  try {
    objectIdContact = ObjectId(contactId);
  } catch (err) {
    return null;
  }
  console.log(objectIdContact);
  return await Contact.findOneAndDelete({ _id: objectIdContact});
};

const updateContact = async (contactId, body) => {
  let objectIdContact;
  try {
    objectIdContact = ObjectId(contactId);
  } catch (err) {
    return null;
  }
  return await Contact.findOneAndUpdate(
    { _id:  objectIdContact },
    {
      $set: body,
    },
    {
			new: true,
			runValidators: true,
			strict: "throw",
		}
  )
}

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  deleteContact,
  updateContact,
};
