const { Contact } = require("../schemas/contact");
const { schemaRequired, schemaOptional } = require("../schemas/validation");

async function getContacts(req, res, next) {
  const { limit } = req.query;
  const contacts = await Contact.find({}).limit(limit);
  return res.json(contacts);
}

async function getContact(req, res, next) {
  const id = req.params.contactId;
  const contact = await Contact.findById(id);

  if (contact) {
    return res.status(200).json(contact);
  }
  return res.status(404).json({ message: "Not found" });
}

async function createContact(req, res, next) {
  const body = { favorite: false, ...req.body };

  const validationResult = schemaRequired.validate(body);
  if (validationResult.error) {
    return res.status(400).json({ message: "missing required name field" });
  }

  const contact = await Contact.create(body);
  return res.status(201).json(contact);
}

async function deleteContact(req, res, next) {
  const id = req.params.contactId;
  const contact = await Contact.findById(id);

  if (contact) {
    const temp = await Contact.findByIdAndDelete(id);
    console.log("temp", temp);

    return res.status(200).json({ message: "contact deleted" });
  }

  return res.status(404).json({ message: "Not found" });
}

async function editContact(req, res, next) {
  const id = req.params.contactId;
  const body = req.body;
  if (Object.keys(body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  const validationResult = schemaOptional.validate(body);
  if (validationResult.error) {
    return res.status(400).json({ message: "invalid value content" });
  }

  const contact = await Contact.findByIdAndUpdate(id, body, { new: true });
  if (contact) {
    return res.status(200).json(contact);
  }
  return res.status(404).json({ message: "Not found" });
}

async function updateStatusContact(req, res, next) {
  const id = req.params.contactId;
  const body = req.body;
  if (Object.keys(body).length === 0) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  const contact = await Contact.findByIdAndUpdate(id, body, { new: true });
  if (contact) {
    return res.status(200).json(contact);
  }
  return res.status(404).json({ message: "Not found" });
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  editContact,
  updateStatusContact,
};
