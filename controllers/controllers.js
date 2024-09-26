const operations = require("../models/contacts");
const { httpError } = require("../helpers");
const contactPush = require("../schemas/joi");

const getContactRoute = async (req, res, next) => {
  try {
    const result = await operations.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactRouteByID = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await operations.getContactById(contactId);
    if (!contactById) {
      throw httpError(404);
    }
    res.json(contactById);
  } catch (error) {
    next(error);
  }
};

const postContactRoute = async (req, res, next) => {
  try {
    const { error } = contactPush.validate(req.body);
    if (error) {
      throw httpError(400, error.message);
    }
    const result = await operations.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContactRoute = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await operations.removeContact(contactId);
    if (!result) {
      throw httpError(404);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const putContactRoute = async (req, res, next) => {
  try {
    const { error } = contactPush.validate(req.body);
    if (error) {
      throw httpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await operations.updateContact(contactId, req.body);
    if (!result) {
      throw httpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContactRoute,
  getContactRouteByID,
  postContactRoute,
  deleteContactRoute,
  putContactRoute,
};
