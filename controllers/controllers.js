const contacts = require("../models/contacts");
const { HttpError } = require("../helpers");
const addScheme = require("../schemes");

async function getListController(req, res, next) {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function getContactController(req, res, next) {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function postContactController(req, res, next) {
  try {
    const { error } = addScheme.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { name, email, phone } = req.body;
    const result = await contacts.addContact(name, email, phone);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function deleteContactController(req, res, next) {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function putContactController(req, res, next) {
  try {
    if (!req.body) {
      throw HttpError(400, "missing fields");
    }
    const { error } = addScheme.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getListController,
  getContactController,
  postContactController,
  deleteContactController,
  putContactController,
};
