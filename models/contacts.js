const express = require("express");
const { contactSchema } = require("./schemas/contact");
const { Contact } = require("./models/contact");
const router = express.Router();

const listContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json({ contacts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getContactById = async (req, res) => {
  const contactId = req.params.id;
  try {
    const contact = await Contact.findById(contactId);
    res.send(contact || "Not found");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

const removeContact = async (req, res) => {
  const contactId = req.params.id;
  try {
    const removedContact = await Contact.findByIdAndRemove(contactId);
    if (!removedContact) {
      throw new Error("Contact not found");
    }
    res.json({ removedContact });
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

const addContact = async (req, res) => {
  const body = req.body;
  try {
    await contactSchema.validateAsync(body);
    const newContact = new Contact(body);
    await newContact.save();
    res.json({ newContact });
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

const updateContact = async (req, res) => {
  const contactId = req.params.id;
  const body = req.body;
  try {
    if (!Object.keys(body).length) {
      throw new Error("No fields to update");
    }

    await contactSchema.validateAsync(body);

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { $set: body },
      { new: true }
    );

    if (!updatedContact) {
      throw new Error("Contact not found");
    }

    res.json({ updatedContact });
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

const updateStatusContact = async (req, res) => {
  const contactId = req.params.id;
  const body = req.body;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { $set: body },
      { new: true }
    );

    if (!updatedContact) {
      throw new Error("Contact not found");
    }

    res.json({ updatedContact });
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};

module.exports = router;
