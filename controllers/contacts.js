const Contact = require("../models/contact");
const Joi = require("joi");
const {
  validateContact,
  updateFavoriteSchema,
} = require("../validation/contacts");

async function getContacts(req, res, next) {
  try {
    const contacts = await Contact.find().exec();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId).exec();

    if (contact === null) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(200).json(contact);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function createContact(req, res, next) {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };

  const response = validateContact(contact);

  if (typeof response.error !== "undefined") {
    return res.status(400).json({ message: "missing required name field" });
  }

  try {
    const result = await Contact.create(contact);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateContact(req, res, next) {
  const { contactId } = req.params;

  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };

  const response = validateContact(contact);

  if (typeof response.error !== "undefined") {
    return res.status(400).json({ message: "missing required name field" });
  }

  try {
    const result = await Contact.findByIdAndUpdate(contactId, contact, {
      new: true,
    });

    if (result === null) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;

  try {
    const result = await Contact.findByIdAndDelete(contactId);

    if (result === null) {
      return res.status(404).json({ message: "Not found" });
    }
    res
      .status(200)
      .json({ message: `Contact with id: ${contactId} successfully deleted` });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateStatusContact(req, res, next) {
  const { contactId } = req.params;

  const contact = {
    favorite: req.body.favorite,
  };

  const response = updateFavoriteSchema(contact);

  if (typeof response.error !== "undefined") {
    return res.status(400).json({ message: "missing field favorite" });
  }

  try {
    const result = await Contact.findByIdAndUpdate(contactId, contact, {
      new: true,
    });

    if (result === null) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  updateStatusContact,
};
