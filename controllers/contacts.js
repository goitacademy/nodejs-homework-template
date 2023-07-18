// CLCOvKYzTKXeVYLN


const contacts = require("../models/contacts");
const { schema } = require("../shema");

const getAll = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await contacts.getContactById(id);
    if (!result) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.json({ result });
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  const body = req.body;
  const { error } = schema.validate(body);
  try {
    if (error) {
      return res.status(400).json({
        message: "missing required name field",
      });
    }
    const result = await contacts.addContact(body);
    res.status(201).json({ result });
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await contacts.removeContact(id);
    if (!result) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const body = req.body;
  const { error } = schema.validate(body);
  try {
    const id = req.params.contactId;
    const result = await contacts.updateContact(id, body);
    if (error) {
      return res.status(400).json({
        message: "missing fields",
      });
    } else if (!result) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.json({ result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  addContact,
  deleteContact,
  update,
};