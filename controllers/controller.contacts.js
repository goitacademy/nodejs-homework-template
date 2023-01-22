const { Contacts } = require("../models/contacts.js");
const { RequestError } = require("../helpers/RequestError.js");
const { contactSchema } = require("../schemas/validationSchemaContact.js");

// GET /api/contacts

async function getAllContacts(req, res, next) {
  try {
    const contactsList = await Contacts.find({});
    return res.status(200).json(contactsList);
  } catch (error) {
    next(error);
  }
}

// GET / api / contacts /: id

async function getContact(req, res, next) {
  try {
    const { id } = req.params;
    const contact = await Contacts.findById({ _id: id });

    if (!contact) {
      throw RequestError(404, "Not found");
    }
    return res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
}

// POST / api / contacts

async function createContact(req, res, next) {
  try {
    const validationResult = contactSchema.validate(req.body);
    const { name, email, phone, favorite } = req.body;
    if (validationResult.error) {
      throw RequestError(404, "missing required name field");
    }
    const newContact = await Contacts.create({ name, email, phone, favorite });
    return res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
}

// DELETE /api/contacts/:id

async function deleteContact(req, res, next) {
  try {
    const { id } = req.params;
    const contactId = await Contacts.findById({ _id: id });
    if (!contactId) {
      throw RequestError(404, "Not found");
    }
    await Contacts.findOneAndRemove({ _id: id });
    return res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
}

// PUT /api/contacts/:id

async function updateContactById(req, res, next) {
  try {
    const { id } = req.params;
    const { name, email, phone, favorite } = req.body;
    const validationResult = contactSchema.validate({
      name,
      email,
      phone,
      favorite,
    });

    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }

    if ({ name, email, phone, favorite } === null) {
      throw RequestError(400, "Missing fields");
    }

    const contactUpdate = await Contacts.findOneAndUpdate(
      { _id: id },
      {
        name,
        email,
        phone,
        favorite,
      }
    );
    if (!contactUpdate) {
      throw RequestError(404, "Not found");
    }
    res.status(200).json(contactUpdate);
    return contactUpdate;
  } catch (error) {
    next(error);
  }
}

//  PATCH /api/contacts/:contactId/favorite

async function updateStatusContact(req, res, next) {
  try {
    const { id } = req.params;
    const { name, email, phone, favorite } = req.body;
    const validationResult = contactSchema.validate({
      name,
      email,
      phone,
      favorite,
    });

    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }

    if ({ name, email, phone, favorite } === null) {
      throw RequestError(400, "Missing field favorite");
    }

    const contactUpdateStatus = await Contacts.findOneAndUpdate(
      { _id: id },
      { favorite }
    );
    if (!contactUpdateStatus) {
      throw RequestError(404, "Not found");
    }
    res.status(200).json(contactUpdateStatus);
    return contactUpdateStatus;
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  updateContactById,
  updateStatusContact,
};
