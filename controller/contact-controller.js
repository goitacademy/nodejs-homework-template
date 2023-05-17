const { nanoid } = require("nanoid");
const { ctrlWrapper } = require("../utils/index");
const contactChange = require("../models/index");
const { HttpError } = require("../helper/HttpError");

const getList = async (req, res, next) => {
  res.json(await contactChange.listContacts());
};

const getContactsbyId = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactChange.getContactById(id);

  if (!contact) {
    throw HttpError(404);
  }
  res.status(200).json(contact);
};

const addContacts = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const id = nanoid();
  const newContact = await contactChange.addContact({
    id,
    name,
    email,
    phone,
  });
  res.status(201).json(newContact);
};

const delContacts = async (req, res, next) => {
  const { id } = req.params;
  const removeContacts = await contactChange.removeContact(id);
  if (!removeContacts) {
    throw HttpError(404);
  }
  res.json("contact deleted");
};

const updateContacts = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const contact = await contactChange.updateContact(id, {
    name,
    email,
    phone,
  });
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

module.exports = {
  getList: ctrlWrapper(getList),
  getContactsbyId: ctrlWrapper(getContactsbyId),
  addContacts: ctrlWrapper(addContacts),
  delContacts: ctrlWrapper(delContacts),
  updateContacts: ctrlWrapper(updateContacts),
};
