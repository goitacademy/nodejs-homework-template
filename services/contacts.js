const { ObjectId } = require("mongoose").Types;
const Contact = require("../models/contact");

const getAllContacts = async (id, queries) => {
  try {
    const { page = 1, limit = 20, favorite = null } = queries;

    if (!favorite) {
      return await Contact.find({ owner: id })
        .limit(+limit)
        .skip((page - 1) * limit);
    }

    return await Contact.find({
      owner: id,
      favorite,
    })
      .limit(+limit)
      .skip((page - 1) * limit);
  } catch (err) {
    return null;
  }
};

const getSingleContact = async (contactId) => {
  let objectIdContact;
  try {
    objectIdContact = ObjectId(contactId);
  } catch (err) {
    return null;
  }

  return await Contact.findOne({ _id: objectIdContact }).lean();
};

const createContact = async (userId, body) => {
  const contact = await Contact.findOne({ ...body, owner: userId });
  if (contact) {
    return null;
  }

  return await Contact.create({ ...body, owner: userId });
}

const deleteContact = async (userId, contactId) => {
  let objectIdContact;
  try {
    objectIdContact = ObjectId(contactId);
  } catch (err) {
    return null;
  }
  return await Contact.findOneAndDelete({ _id: objectIdContact, owner: userId });
};

const updateContact = async (contactId, body) => {
  let objectIdContact;
  try {
    objectIdContact = ObjectId(contactId);
  } catch (err) {
    return null;
  }
  return await Contact.findOneAndUpdate(
    { _id: objectIdContact },
    {
      $set: body,
    },
    {
      new: true,
      runValidators: true,
      strict: "throw",
    }
  );
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  deleteContact,
  updateContact,
};
