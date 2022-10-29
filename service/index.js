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

const deleteContact = (contactId) => {
  let objectIdContact;
  try {
    objectIdContact = ObjectId(contactId);
  } catch (err) {
    return null;
  }
  console.log(objectIdContact);
  return Contact.findOneAndDelete({ _id: objectIdContact});
};

const updateContact = (contactId, body) => {
  let objectIdContact;
  try {
    objectIdContact = ObjectId(contactId);
  } catch (err) {
    return null;
  }
  return Contact.findOneAndUpdate(
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
