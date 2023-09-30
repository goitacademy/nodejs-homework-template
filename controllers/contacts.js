const Contact = require("../models/contact");
const { ctrlWrapper } = require("../helpers/ctrlWrapper");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw new Error(404 && "Not found");
  }
  res.status(200).json(result);
};

const postContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw new Error(404 && "Not found");
  }
  res.json({ message: "Succesfully removed!" });
};

const putContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.updateContactById(id, req.body);
  if (!result) {
    throw new Error(404 && "Not found");
  }
  res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getContactById: ctrlWrapper(getContactById),
  postContact: ctrlWrapper(postContact),
  deleteContact: ctrlWrapper(deleteContact),
  putContact: ctrlWrapper(putContact),
};
