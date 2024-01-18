const Contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

async function getAll(req, res, next) {
  try {
    const result = await Contacts.find();
    res.send(result);
  } catch (error) {
    next(error);
  }
}

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Contacts.findById(id);
    if (result === null) {
      return res.status(404).send("Contact not found");
    }
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const result = await Contacts.create(req.body);
    res.status(201).json(result);
  }catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Contacts.findByIdAndDelete(id);
    if (result === null) {
      return res.status(404).send("Contact is not found");
    }
    res.send({ id });
  } catch (error) {
    next(error);
  }
}

const updateById = async (req, res, next) => {
  const body = req.body;
  try {
    if (!req.body || Object.keys(body).length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }
    const { contactId } = req.params;
    const result = await Contacts.findByIdAndUpdate(contactId, { favorite: req.body.favorite },  { new: false });
    if (result === null) {
      return res.status(404).send("Contact not found");
    }
    res.send(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  remove: ctrlWrapper(remove),
  updateById: ctrlWrapper(updateById),
};