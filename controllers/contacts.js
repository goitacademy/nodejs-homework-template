const contacts = require("../models/contacts");
const schema = require("../schemas/contacts");

const list = async (req, res, next) => {
  try {
    const list = await contacts.listContacts();

    res.json(list);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const contact = await contacts.getContactById(req.params.contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = schema.addContact.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { error } = schema.updateContact.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const updatedContact = await contacts.updateContact(
      req.params.contactId,
      req.body
    );

    if (!updatedContact) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const status = await contacts.removeContact(req.params.contactId);
    if (!status) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  list,
  getById,
  add,
  update,
  remove,
};
