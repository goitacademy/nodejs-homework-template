const contacts = require("../models/contacts");
const { contactSchema } = require("../Shema/shema");
const { HttpError } = require("../Helpers/HttpError");
const decorarot = require("../Helpers/decorator");
const Contact = require("../model/contactModel");
const shema = require("../Shema/shema");
//======================getAll==========================
const getAll = async (req, res, next) => {
  // for user pawword   const contacts = await Contact.find().select('-password');
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};

//========================getID========================
const getID = async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  console.log("work controllers");

  res.status(200).json({ msg: "Id contact", contact });
};

//=======================create=========================
const post = async (req, res, next) => {
  const newContact = await Contact.create(req.body);
  // just for password  newUser.password = undefined
  res.status(201).json(newContact);
};

//=======================delete=========================
const delet = async (req, res, next) => {
  const { contactId } = req.params;
  const func = await contacts.removeContact(contactId);
  if (func) {
    res.status(200).json({ message: "contact deleted" });
  } else !func;
  {
    res.status(404).json({ message: "not found" });
  }
};

//========================put========================
const put = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (result === null) {
    res.status(404).json({ message: "not valid ID" });
  }
  res.status(200).json(result);
};

module.exports = {
  getAll: decorarot(getAll),
  getID: decorarot(getID),
  post: decorarot(post),
  delet: decorarot(delet),
  put: decorarot(put),
};
