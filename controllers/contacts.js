const { Contact } = require("../models");

const { HttpErorr, ctrlWrapper } = require("../helpers");
const Joi = require("joi");
// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// } = require("../models/contacts");

const getAll = async (req, res) => {
  //   const contacts = await listContacts();
  const contacts = await Contact.find();
  res.json({ contacts, status: "200" });
};

const getById = async (req, res) => {
  // const contact = await getContactById(req.params.contactId);
  const contact = await Contact.findById(req.params.contactId);
  if (!contact) {
    throw HttpErorr(404, "Not found");
  }
  res.json({ contact, status: "200" });
};

const add = async (req, res) => {
  const newContacts = await Contact.create(req.body);
  console.log(req.body);
  res.status(201).json(newContacts);
};

const updateById = async (req, res, next) => {
  const updateContacts = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  //  const updateContacts = await updateContact(req.params.contactId, req.body);
  if (!updateContacts) {
    res.json({ message: "Not found", status: "404" });
  }
  res.json({ updateContacts, status: "200" });
};

const updateFavorite = async (req, res, next) => {
  const updateContacts = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  if (!updateContacts) {
    throw HttpErorr(404, "Not found");
  }
  res.json({ updateContacts, status: "200" });
};

const deleteById = async (req, res, next) => {
  // const contactDelete = await removeContact(req.params.contactId);
  const contactDelete = await Contact.findByIdAndRemove(req.params.contactId);
  if (!contactDelete) {
    throw HttpErorr(404, "found");
  } else {
    res.json({ message: "contact deleted", status: "200" });
  }
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
  getById: ctrlWrapper(getById),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
