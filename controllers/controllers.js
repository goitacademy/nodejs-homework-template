const contactsOperation = require("../models/contacts");

const { RequestError } = require("../helpers/RequestError");

const addSchema = require("../schemas/schemas");

const GetList = async (req, res, next) => {
  try {
    const result = await contactsOperation.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const GetById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperation.getContactById(id);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const AddContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const result = await contactsOperation.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const UpdateContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const { id } = req.params;
    const result = await contactsOperation.updateContact(id, req.body);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const DeleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperation.removeContact(id);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  GetList,
  GetById,
  AddContact,
  UpdateContact,
  DeleteContact,
};
