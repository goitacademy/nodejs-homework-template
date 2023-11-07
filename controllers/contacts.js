const Joi = require("joi");
const { Contact, ObjectId } = require("../models/contacts");

const { ctrlWrapper } = require("../helpers");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const getAll = async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};

const getById = async (req, res, next) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Contact not found" });
  }
  const contact = await Contact.findById(id);

  res.status(200).json(contact);
};

const add = async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing required name field" });
  }

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const newContact = new Contact({ name, email, phone });

  const addedContact = await newContact.save();

  res.status(201).json(addedContact);
};

const remove = async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Contact not found" });
  }

  const removedContact = await Contact.findByIdAndDelete(id);

  if (removedContact) {
    return res.status(200).json({ message: "Contact deleted" });
  } else {
    return res.status(500).json({ message: "Contact could not be deleted" });
  }
};

const update = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing required name field" });
  }

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Contact not found" });
  }

  const updatedContact = await Contact.findByIdAndUpdate(id, {
    name,
    email,
    phone,
  });
  if (updatedContact) {
    res.status(200).json(updatedContact);
  } else {
    res.status(500).json({ message: "Update failed" });
  }
};

const updateStatus = async (req, res) => {
  const id = req.params.id;
  const { favorite } = req.body;

  if (!favorite) {
    return res.status(400).json({ message: "Missing field favorite" });
  }

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Contact not found" });
  }

  const updateStatusContact = await Contact.findByIdAndUpdate(id, { favorite });

  if (updateStatusContact) {
    return res.status(200).json(updateStatusContact);
  } else {
    return res.status(400).json({ message: "Contact not found" });
  }
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add,
  remove,
  update,
  updateStatus,
};
