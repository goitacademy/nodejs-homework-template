const db = require("../models/contacts");
const schemas = require("../schemas/schemas");
const { Contact } = require("../db/contactModel");

async function getListContacts(req, res, next) {
  const contacts = await Contact.find({});
  res.json({ data: contacts });
}

async function getContactsById(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.find({ _id: contactId });
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
    const { name, email, phone } = newContact;
    const contact = new Contact({ name, email, phone });
    await contact.save();
    // await db.addContact(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    return res.status(400).json({ status: "error" });
  }
}

async function deleteContactById(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await Contact.remove({ _id: contactId });
    console.log(contact);
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
}

async function changeContactById(req, res, next) {
  try {
    const isValidData = schemas.put.validate(req.body);
    if (isValidData.error) {
      return res.status(400).json({ status: validationResult.error });
    }
    const { contactId } = req.params;
    await Contact.updateOne({ _id: contactId }, req.body);
    res.json(req.body);
  } catch (error) {
    return res.status(400).json({ status: "error" });
  }
}

async function updateStatusContact(req, res, next) {
  try {
    const isValidData = schemas.patch.validate(req.body);
    if (isValidData.error) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    const { contactId } = req.params;
    await Contact.updateOne({ _id: contactId }, req.body);
    const contact = await Contact.find({ _id: contactId });
    res.status(200).json({ contact });
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
  updateStatusContact,
};
