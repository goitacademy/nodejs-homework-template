const ctrlWrap = require("../helpers/ctrlWrap");
const Contacts = require("../models/contacts");

const listContacts = async (req, res, next) => {
  const contacts = await Contacts.find();
  res.send(contacts);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contacts.findById(contactId);

  if (!contact) {
    return next();
  }

  res.send(contact);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  await Contacts.findByIdAndDelete(contactId);

  res.send({ contactId });
};

const addContact = async (req, res) => {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };

  const result = await Contacts.create(contact);
  res.status(201).send(result);
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };

  const result = await Contacts.findByIdAndUpdate(contactId, contact, {
    new: true,
  });
  if (result === null) {
    return next();
  }

  res.send(result);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const status = {
    favorite: req.body.favorite,
  };

  const result = await Contacts.findByIdAndUpdate(contactId, status, {
    new: true,
  });

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  if (result === null) {
    return next();
  }

  res.send(result);
};

module.exports = {
  listContacts: ctrlWrap(listContacts),
  getContactById: ctrlWrap(getContactById),
  removeContact: ctrlWrap(removeContact),
  addContact: ctrlWrap(addContact),
  updateContact: ctrlWrap(updateContact),
  updateStatusContact: ctrlWrap(updateStatusContact),
};
