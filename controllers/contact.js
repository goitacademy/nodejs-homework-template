const { isValidObjectId } = require("mongoose");
const Joi = require('joi');
const Contact = require("../models/contact");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required(),
});

async function validateContactId(req, res, next) {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    return res.status(404).json({ message: "Not found" });
  }
  next();
}

async function getContacts(req, res, next) {
  try {
    const contacts = await Contact.find().exec();
    console.log(contacts);
    res.send(contacts);
  } catch (err) {
    next(err);
  }
}
async function getContact(req, res, next) {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId).exec();
    if (contact === null) {
      return res.status(404).send("Contact not found");
    }
    res.json(contact);
  } catch (err) {
    next(err);
  }
}

async function createContact(req, res, next) {
  const { error } = contactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: Boolean(req.body.favorite),
  };

  try {
    const result = await Contact.create(contact);
    console.log(result);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
    next(err);
  }
}

async function updateContact(req, res, next) {
  const { contactId } = req.params;
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: Boolean(req.body.favorite),
  };
  try {
    const result = await Contact.findByIdAndUpdate(contactId, contact, {
      new: true,
    });
    if (result === null) {
      return res.status(404).send("Contact not found");
    }
    console.log(result);
    res.send(result);
  } catch (err) {
    next(err);
  }
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;

  try {
    const result = await Contact.findByIdAndDelete(contactId);
    if (result === null) {
      return res.status(404).send("Contact not found");
    }
    res.send({ contactId });
  } catch (err) {
    next(err);
  }
}

async function updateStatusContact(req, res) {
  const { contactId } = req.params;
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: Boolean(req.body.favorite),
  };

  if (contact.favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  try {
    const result = await Contact.findByIdAndUpdate(contactId, contact, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  validateContactId,
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  updateStatusContact,
};
