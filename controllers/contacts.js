const Contacts = require("../models/contacts.js");
const wrapController = require("../helpers/wrapController.js");

const listContactsControllers = async (_, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getByIdControllers = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contacts.getById(contactId);

    if (contact !== null) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};

const addContactControllers = async (req, res, next) => {
  try {
    const newContact = await Contacts.addContact({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const removeContactControllers = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contacts.removeContact(contactId);

    if (contact !== null) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};
const updateContactControllers = async (req, res, next) => {
  try {

    const { contactId } = req.params;
    const updatedContact = await Contacts.updateContact(
      contactId,
      req.body
    );

    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  listContacts: wrapController(listContactsControllers),
  getById: wrapController(getByIdControllers),
  addContact: wrapController(addContactControllers),
  removeContact: wrapController(removeContactControllers),
  updateContact: wrapController(updateContactControllers),
};
