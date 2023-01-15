const schema = require("../schemas/schemas");
const Contacts = require("../models/contacts");
const contactStatusSchema = require("../schemas/schemas");

// get all Contacts
const getContacts = async (req, res, next) => {
  try {
    const { limit } = req.query;

    const contacts = await Contacts.find({}).limit(limit);
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

// get contact by Id
const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await Contacts.findById(contactId);

    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    return res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

// delete contact by Id
const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contacts.findById(contactId);

    if (!contact) {
      res.status(404).json({ message: "Not found" });
    }

    await Contacts.findByIdAndRemove(contactId);

    res.status(200).json({ message: "contact is deleted" });
  } catch (error) {
    next(error);
  }
};

// create new contact
const createNewContact = async (req, res, next) => {
  try {
    const newContact = await Contacts.create(req.query);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

// change contact by Id
const changeContact = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.query);
    const { contactId } = req.params;

    // audit required fields
    if (error) {
      res.status(400).json({ message: error.message });
    }

    // audit contact by Id
    const contact = await Contacts.findById(contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
    }

    const updatedContact = await Contacts.findOneAndUpdate(
      contactId,
      req.query
    );

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = contactStatusSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "missing field favorite" });
    }

    const { contactId } = req.params;
    const contact = await Contacts.findById(contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
    }

    const updatedContact = await Contacts.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContact,
  deleteContact,
  createNewContact,
  changeContact,
  updateStatusContact,
};
