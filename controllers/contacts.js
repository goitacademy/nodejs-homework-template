
const  {updateFavoriteContact} = require("../models/contact");
const { Contact } = require('../models/contact');
const { schema } = require("../shema/index");

const getAll = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await Contact.findById (id);
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
    const result = await Contact.create(body);
    res.status(201).json({ result });
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await Contact.findOneAndRemove(id);
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
    const result = await Contact.findByIdAndUpdate(id, body, { new: true });
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

const updateStatusContact = async (req, res, next) => {
  const body = req.body;
  const { error } = updateFavoriteContact.validate(body);
  try {
    const id = req.params.contactId;
    const result = await Contact.findByIdAndUpdate(id, body, { new: true });
    if (error) {
      return res.status(400).json({
        message: "missing field favorite",
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
  updateStatusContact
};


