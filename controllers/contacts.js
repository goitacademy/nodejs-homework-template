const { addContactSchema } = require("../schemas/contactsSchema");

const Contact = require("../models/contacts");

async function getContacts(req, res, next) {
  const { limit = 20, page = 1 } = req.query;
  const pagination = (page - 1) * limit;
  const contacts = await Contact.find({}).skip(pagination).limit(limit)
  return res.status(200).json(contacts);
}

async function getContact(req, res, next) {
  const contactById = await Contact.findById(req.params.contactId);

  if (!contactById) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.status(200).json(await contactById);
}

async function createContact(req, res, next) {
  const { error } = addContactSchema.validate(req.body);
  if (error) {
    return res.status(404).json(error.details[0].message);
  }

  const { name, email, phone } = req.body;

  const newContact = {
    name,
    email,
    phone,
  };

  const result = await Contact.create(newContact);
  res.status(201).json(result);
}

async function deleteContact(req, res, next) {
  const result = await Contact.findByIdAndRemove(req.params.contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
}

async function changeContact(req, res, next) {
  const { error } = addContactSchema.validate(req.body);
  if (error) {
    return res.status(404).json(error.details[0].message);
  }
  const id = req.params.contactId;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(result);
}
async function changeFavoriteContact(req, res, next) {
  const id = req.params.contactId;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(result);
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  changeContact,
  changeFavoriteContact,
};
