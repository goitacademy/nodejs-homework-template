const contactsService = require("../models/index");
const { HttpError } = require("../helpers/HttpErrors");
const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const getAll = async (req, res, next) => {
  try {
    const contacts = await contactsService.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsService.getContactById(id);

    if (!contact) {
      throw HttpError(404, `Contact with ${id} is not found`);
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  console.log("Inside add function", req.body);
  try {
    const { name, email, phone } = req.body;
    const { error } = contactAddSchema.validate({ name, email, phone });
    if (error) {
      throw HttpError(400, error.message);
    }

    const newContact = await contactsService.addContact({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await contactsService.removeContact(id);
    if (!deletedContact) {
      throw HttpError(404, `Contact with ${id} is not found`);
    }

    res.status(200).json({ data: deletedContact });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const updateById = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "All fields are empty");
    }
    const { name, email, phone } = req.body;
    const { error } = contactAddSchema.validate({ name, email, phone });
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const { body } = req;
    const updatedContacts = await contactsService.updateContact(id, body);
    if (!updatedContacts) {
      throw HttpError(404, `Contact with ${id} is not found`);
    }
    res.status(200).json(updatedContacts);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
};
