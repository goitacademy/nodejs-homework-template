import * as helpers from "./helpers.js";

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await helpers.dbFetchContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await helpers.dbFetchContact(contactId);
    if (contact) {
      res.json(contact);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const addContact = async (req, res, next) => {
  try {
    const contact = await helpers.dbInsertContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

export const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await helpers.dbDeleteContact(contactId);
    if (contact) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await helpers.dbUpdateContact(contactId, req.body);
    if (contact) {
      res.status(200).json(contact);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await helpers.dbUpdateStatusContact({
      id: contactId,
      toUpdate: req.body,
    });
    if (contact) {
      res.status(200).json(contact);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
