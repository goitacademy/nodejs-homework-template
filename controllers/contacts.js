const { Contact } = require("../models/contacts");

const {
  addContactSchema,
  updContactSchema,
} = require("../middlewares/validateBody");

const ctrlWrapper = require("../helpers/ctrlWrapper");

const getAll = async (req, res) => {
  const contactsList = await Contact.find();
  res.status(200).json(contactsList);
};

const getById = async (req, res) => {
  const id = req.params.contactId;

  const oneContact = await Contact.findById(id);
  if (!oneContact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(oneContact);
};

const add = async (req, res) => {
  const body = req.body;
  const { error } = addContactSchema.validate(body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const newContact = await Contact.create(body);
  res.status(201).json(newContact);
};

const deleteById = async (req, res) => {
  const id = req.params.contactId;
  const deleteContact = await Contact.findByIdAndRemove({ _id: id });
  if (!deleteContact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json({
    message: `Contact deleted`,
  });
};

const updateById = async (req, res) => {
  const body = req.body;
  const id = req.params.contactId;
  const { error } = updContactSchema.validate(body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const updContact = await Contact.findByIdAndUpdate({ _id: id }, body, {
    new: true,
  });
  if (!updContact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(updContact);
};

const updateFavorite = async (req, res) => {
  const body = req.body;
  const id = req.params.contactId;
  const { error } = updContactSchema.validate(body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  const updContact = await Contact.findByIdAndUpdate({ _id: id }, body, {
    new: true,
  });
  if (!updContact) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(updContact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
