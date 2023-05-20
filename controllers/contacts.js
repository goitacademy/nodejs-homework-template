const Joi = require("joi");

const contacts = require("../models/contacts");
const { HttpError } = require("../helpers");
const { addContact } = require("../models/contacts");


const addShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const getAll = async ( req, res, next) => { 
  try {
    const results = await contacts.listContacts();
    res.json(results);
  } catch (error) {
    next(error);
  }
}
const getById = async (req, res, next) => { 
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
}

const add = async (req, res, next) => { 
try {
    const { error } = addShema.validate(req.body);
    if (error) {
      throw HttpError(error, error.message);
    }
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

const deleteById = async (req, res, next) => { 
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({ message: "Delete success" });
  } catch (error) {
    next(error);
  }
}
const updateById = async (req, res, next) => { 
try {
    const { error } = addShema.validate(req.body);
    if (error) {
      throw HttpError(error, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}
module.exports = {
  getAll,
  getById,
  add,
  deleteById,
  updateById

}