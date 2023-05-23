const contactsService = require("../models/contacts");
const HttpError = require("../helpers");
const addScheme = require("../schemas");

async function getListController(req, res, next) {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function getContactController(req, res, next) {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
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
      throw HttpError(400, "missing required name field");
    }
    const { name, email, phone } = req.body;
    const result = await contactsService.addContact(name, email, phone);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function deleteContactController(req, res, next) {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
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
    const result = await contactsService.updateContact(contactId, req.body);
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
