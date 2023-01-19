const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts.js");

const { RequestError } = require("../helpers/RequestError.js");
const { contactSchema } = require("../schemas/validationSchemaContact.js");

// GET /api/contacts

async function getAllContacts(req, res, next) {
  try {
    const contactsList = await listContacts();
    res.status(200).json({ body: contactsList });
  } catch (error) {
    next(error);
  }
}

// GET / api / contacts /: id

async function getContact(req, res, next) {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);

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
    const body = req.body;
    if (validationResult.error) {
      throw RequestError(404, "missing required name field");
    }
    const newContact = await addContact(body);
    return res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
}

// DELETE /api/contacts/:id

async function deleteContact(req, res, next) {
  try {
    const { id } = req.params;
    const contactId = await removeContact(id);
    if (!contactId) {
      throw RequestError(404, "Not found");
    }
    return res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
}

// PUT /api/contacts/:id

async function updateContactById(req, res, next) {
  try {
    const id = req.params.id;
    const { name, email, phone } = req.body;
    const validationResult = contactSchema.validate({ name, email, phone });

    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.details });
    }

    if ({ name, email, phone } === null) {
      throw RequestError(400, "Missing fields");
    }

    const contactUpdate = await updateContact(id, { name, email, phone });
    if (!contactUpdate) {
      throw RequestError(404, "Not found");
    }
    return res.status(200).json(contactUpdate);
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
};
