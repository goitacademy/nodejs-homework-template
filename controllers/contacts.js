const Contact = require("../models/contact");
const { ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.getContactById(id);
  if (!result) {
    throw new Error(404 && "Not found");
  }
  res.status(200).json(result);
};

const postContact = async (req, res) => {
  const result = await Contact.addContact(req.body);
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.removeContact(id);
  if (!result) {
    throw new Error(404 && "Not found");
  }
  res.json({ message: "Succesfully removed!" });
};

const putContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.updateContactById(id, req.body);
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
