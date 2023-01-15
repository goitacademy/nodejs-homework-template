// const db = require("../models/contacts");
const { HttpError } = require("../utils/httpError");
const {
  contactAddSchema,
  contactUpdateStatusSchema,
} = require("../utils/validation");
const { Contact } = require("../models/model");

async function getContacts(req, res) {
  try {
    const { limit } = req.query;
    const contacts = await Contact.find({}).limit(limit);

    res.status(200).json({ contacts });
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
}

async function getContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return next(HttpError(404, "Not found"));
    }

    return res.status(200).json({ contact });
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
}

async function addContact(req, res, next) {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      return next(HttpError(400, "Missing required name field"));
    }

    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Missing required name field" });
    }

    const newContact = await Contact.create({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
}

async function deleteContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return next(HttpError(404, "Not found"));
    }

    await Contact.findByIdAndRemove(contactId);
    return res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
}

async function updateContact(req, res, next) {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      return next(HttpError(400, "Missing required name field"));
    }

    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) {
      return next(HttpError(404, "Not found"));
    }

    res.json(result);
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
}

async function updateStatusContact(req, res, next) {
  try {
    const { error } = contactUpdateStatusSchema.validate(req.body);
    if (error) {
      return next(HttpError(400, "Missing required name field"));
    }

    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) {
      return next(HttpError(404, "Not found"));
    }

    res.json(result);
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
}

module.exports = {
  getContacts,
  getContact,
  addContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
