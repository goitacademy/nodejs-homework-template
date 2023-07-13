const Joi = require("joi");
const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const contactFullSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const getAll = async (req, res) => {
    const data = await contacts.listContacts();
    res.json(data);
};

const getById = async (req, res) => {
    const { contactId } = req.params;
    const data = await contacts.getContactById(contactId);
    if (!data) {
      throw HttpError(404, "Not found");
    }
    res.json(data);
};

const addOne = async (req, res) => {
    const { error } = contactFullSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);
    const data = await contacts.addContact(req.body);
    res.status(201).json(data);
};

const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const data = await contacts.removeContact(contactId);
    if (!data) {
      throw HttpError(404, "Not found");
    }
    res.json(data);
};

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const { error } = contactFullSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);
    const data = await contacts.updateContact(contactId, req.body);
    if (!data) {
      throw HttpError(404, "Not found");
    }
    res.json(data);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addOne: ctrlWrapper(addOne),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
