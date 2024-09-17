const { Contact } = require("../models/contact");

const getAllContacts = async (owner, query, sortBy) => {
  const data = await Contact.find(owner, "-createdAt -updatedAt", query)
    .populate("owner", "-_id email subscription")
    .sort(sortBy);
  const count = await Contact.countDocuments(owner);
  return { data, count };
};
const getOneContact = (_id, owner) =>
  Contact.findOne({ _id, owner }).populate("owner", "-_id email subscription");

const addContact = (body) => Contact.create(body);

const updateContact = (_id, owner, body) =>
  Contact.findOneAndUpdate({ _id, owner }, body, { new: true });

const removeContact = (_id, owner) => Contact.findOneAndRemove({ _id, owner });

module.exports = {
  getAllContacts,
  getOneContact,
  addContact,
  updateContact,
  removeContact,
};