const service = require("../service");
// const service = require("../models/contacts");

const Joi = require("joi");

// konfiguracja joi do walidancji danych
const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  phone: Joi.string().pattern(/[0-9]{9}/),

  favorite: Joi.bool(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "pl", "gov", "net"] },
  }),
});
// konfiguracja joi do sprawdzenia favorite
const checkFavorite = Joi.object({
  favorite: Joi.bool(),
});

const listContacts = async (req, res, next) => {
  try {
    const contacts = await service.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: contacts,
      },
    });
  } catch (e) {
    console.error(e);
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await service.getContactById(contactId);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { findContact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found Contact with id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
  }
};

const createContact = async (req, res, next) => {
  const body = req;
  const { name, email, phone } = req.query;

  try {
    const validation = schema.validate({ name, email, phone });
    if (validation.error) {
      return res
        .status(400)
        .json({ message: validation.error.details[0].message });
    }
    // sprawdzam czy nie ma kontaktu o takim imieniu
    const contacts = await service.listContacts();
    const isNameUnique = !contacts.some((elem) => elem.name === name);
    if (!isNameUnique) {
      return res.status(400).json({
        status: "error",
        code: 400,
        data: { message: "you already have contact with that name" },
      });
    } else {
      const result = await service.addContact(body);
      res.status(201).json({
        status: "success",
        code: 201,
        data: { addedContact: result },
      });
    }
  } catch (e) {
    console.error(e);
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.query;
  console.log(body);
  const { name, email, phone } = req.query;
  try {
    const validation = schema.validate({ name, email, phone });
    if (validation.error) {
      return res
        .status(400)
        .json({ message: validation.error.details[0].message });
    }
    const result = await service.updateContact(contactId, body);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { updated: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
  }
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await service.removeContact(contactId);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { deletedContact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.query;
  const { favorite } = req.query;
  try {
    const validation = checkFavorite.validate({ favorite });
    if (validation.error) {
      return res
        .status(400)
        .json({ message: validation.error.details[0].message });
    }
    const result = await service.updateContact(contactId, body);
    if (result && Object.keys(req.query).length !== 0) {
      res.json({
        status: "success",
        code: 200,
        data: { updated: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "missing field favorite",
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
  }
};
module.exports = {
  listContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateStatusContact,
};