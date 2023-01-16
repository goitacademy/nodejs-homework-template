const { HttpError } = require("../helpers/index");
const { Contact } = require("../models/contacts");

async function getContacts(req, res) {
    const { limit } = req.query;
    const contacts = await Contact.find({}).limit(limit);
    res.status(200).json(contacts);
}

async function getContact(req, res, next) {
    try {
        const { contactId } = req.params;
        const contact = await Contact.findById(contactId);
        if (!contact) {
        return next(HttpError(404, "Movie not found"));
        }
        return res.status(200).json(contact);
    } catch (error) {
        next (error)
    }
}

async function createContact(req, res, next) {
    try {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            return next(HttpError(400, "missing required name field"));
        }
        const newContact = await Contact.create({ name, email, phone });
        res.status(201).json(newContact);
    } catch (error) {
        next(error);
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
    next(error);
  }
}

async function contactToUpdate(req, res, next) {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return next(HttpError(400, "missing fields"));
    }

    const contactUpdate = await Contact.findById(contactId);
    if (!contactUpdate) {
      return next(HttpError(404, "Not found"));
    }
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      {
        name,
        email,
        phone,
      },
      { new: true }
    );
    return res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
}

async function contactStatusToUpdate(req, res, next) {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    const contactToUpdate = await Contact.findById(contactId);
    if (!contactToUpdate) {
      return next(HttpError(404, "Not found"));
    }
    const updatedStatusContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    return res.status(200).json(updatedStatusContact);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  contactToUpdate,
  contactStatusToUpdate,
};