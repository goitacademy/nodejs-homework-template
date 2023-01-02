const db = require("../models/contacts");
const schemas = require("../schemas/schemas");

async function getListContacts(req, res, next) {
  const contacts = await db.listContacts();
  res.json({ data: contacts });
}

async function getContactsById(req, res, next) {
  const { contactId } = req.params;
  const contact = await db.getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "not found" });
  }
  res.json({ data: contact });
}

async function addNewContact(req, res, next) {
  try {
    const isValidData = schemas.post.validate(req.body);
    if (isValidData.error) {
      return res.status(400).json({ status: validationResult.error });
    }
    const newContact = req.body;
    newContact.id = Date.now().toString();
    await db.addContact(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    return res.status(400).json({ status: "error" });
  }
}

async function deleteContactById(req, res, next) {
  const { contactId } = req.params;
  const contact = await db.getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "not found" });
  }
  await db.removeContact(contactId);
  res.status(200).json({ message: "contact deleted" });
}

async function changeContactById(req, res, next) {
  try {
    const isValidData = schemas.put.validate(req.body);
    if (isValidData.error) {
      return res.status(400).json({ status: validationResult.error });
    }
    const { contactId } = req.params;
    const findContact = await db.getContactById(contactId);
    if (findContact === null) {
      return res.status(400).json({ msg: `Contact ${contactId} is not found` });
    }
    await db.updateContact(contactId, req.body);
    res.json(req.body);
  } catch (error) {
    return res.status(400).json({ status: "error" });
  }
}

module.exports = {
  getListContacts,
  getContactsById,
  addNewContact,
  deleteContactById,
  changeContactById,
};
