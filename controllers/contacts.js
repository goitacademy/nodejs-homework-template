const {
  contactModel: { ContactModel },
} = require("../models");
const token = require("../utils");

const listContacts = async (req, res) => {
  const [_, userToken] = req.headers.authorization.split(" ");
  const userId = token.getIdByToken(userToken);
  const contactsList = await ContactModel.find({ owner: userId }, "_id name email phone");
  res.status(200).json(contactsList);
};

const getContactById = async (req, res) => {
  const contactId = req.params.contactId;
  const [_, userToken] = req.headers.authorization.split(" ");
  const userId = token.getIdByToken(userToken);
  const contact = await ContactModel.find(
      { owner: userId, _id: contactId },
      "_id name email phone"
  );
  res.status(200).json(contact);
};

const removeContact = async (req, res) => {
  const contactId = req.params.contactId;
  await ContactModel.findByIdAndDelete(contactId);
  res.status(204);
};

const addContact = async (req, res) => {
  const [_, userToken] = req.headers.authorization.split(" ");
  const userId = token.getIdByToken(userToken);
  const contact = await ContactModel.create({ ...req.body, owner: userId });
  res.status(201).json(contact);
};

const updateContact = async (req, res) => {
  const contactId = req.params.contactId;
  const contact = await ContactModel.findByIdAndUpdate(contactId, req.body, {
    new: true,
    select: "_id name email phone",
  });
  res.status(200).json(contact);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,  
  addContact,
  updateContact,
};
