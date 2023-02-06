const { Contact } = require("../models/contact");
const { HttpError } = require("../helpers/helpers");

async function getContacts(req, res) {
  const { limit = 20, page = 1 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({}).skip(skip).limit(limit)
  return res.status(200).json(contacts);
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) {
    return next(HttpError(404, "Not found"));
  }
  return res.status(200).json(contact);
}

async function addContactById(req, res, next) {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;
 
  const newContact = await Contact.create({ contactId, name, email, phone, favorite });
 return res.status(201).json(newContact);
}

async function removeContactById(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) {
    return next(HttpError(404, "Not found"));
  }
  await Contact.findByIdAndRemove(contactId);
 return res.status(200).json({ message: "contact deleted" });
}

async function updateContactById(req, res) {
  const { contactId } = req.params;
  if (!req.body) {
    throw HttpError(400, "Missing fields");
  }
  const contactUpdate = await Contact.findByIdAndUpdate( contactId, req.body );
  if (!contactUpdate) {
    throw HttpError(404, "Not found");
  }
  
  res.status(200).json(contactUpdate);
}

async function updateStatusContact(req, res) {
  const { contactId } = req.params;
  if (!req.body) {
    throw HttpError(400, "missing field favorite");
  }
  const contactUpdate = await Contact.findByIdAndUpdate( contactId, req.body, {favorite: true} );
  if (!contactUpdate) {
    throw HttpError(404, "Not found");
  }
  
  res.status(200).json(contactUpdate);
}


module.exports = {
  getContacts,
  getContact,
  addContactById,
  removeContactById,
  updateContactById,
  updateStatusContact
};