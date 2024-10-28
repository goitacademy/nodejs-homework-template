const Contact = require("../models/contactsShema");

exports.getContacts = async (userId) => {
  return Contact.find({ owner: userId });
};

exports.getContacts = async (userId, { page = 1, limit = 20, favorite }) => {
  const skip = (page - 1) * limit;
  const query = { owner: userId };

  if (favorite !== undefined) {
    query.favorite = favorite === "true";
  }

  const contacts = await Contact.find(query).skip(skip).limit(Number(limit));
  const totalContacts = await Contact.countDocuments(query);

  return { contacts, totalContacts, page, limit };
};

exports.getContactById = async (userId, contactId) => {
  return Contact.findOne({ _id: contactId, owner: userId });
};

exports.createContact = async (userId, contactData) => {
  return Contact.create({ ...contactData, owner: userId });
};

exports.updateContact = async (userId, contactId, contactData) => {
  return Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    contactData,
    { new: true }
  );
};

exports.deleteContact = async (userId, contactId) => {
  return Contact.findOneAndDelete({ _id: contactId, owner: userId });
};
