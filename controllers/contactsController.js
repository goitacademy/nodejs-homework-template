const Joi = require('joi');
const Contact = require('../models/contacts');

const contactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\d{3}-\d{3}-\d{4}$/).required(),
});

exports.listContacts = async (req, res) => {
  try {
    const allContacts = await Contact.find();
    res.status(200).json(allContacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addContact = async (req, res) => {
  try {
    const { error } = contactSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ message: error.details.map(e => e.message).join(', ') });
    }
    const { name, email, phone } = req.body;
    const newContact = await Contact.create({ name, email, phone });
    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeContact = async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await Contact.findByIdAndRemove(id);
    if (removed) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateContact = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }
    const { error } = contactSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ message: error.details.map(e => e.message).join(', ') });
    }
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(id, { name, email, phone }, { new: true });
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateStatusContact = async (contactId, body) => {
  if (typeof body.favorite !== 'boolean') {
    throw new Error("Field 'favorite' must be a boolean");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite: body.favorite },
    { new: true }
  );

  if (!updatedContact) {
    throw new Error("Not found");
  }

  return updatedContact;
};

exports.updateFavoriteStatus = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  try {
    const updatedContact = await exports.updateStatusContact(contactId, req.body);
    res.status(200).json(updatedContact);
  } catch (err) {
    if (err.message === "Not found") {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(500).json({ message: err.message });
  }
};
