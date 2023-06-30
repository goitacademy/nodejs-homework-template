const Joi = require("joi");
const { HttpErrors } = require("../helpers");
const { hlpWrapper } = require("../helpers/hlpWrapper");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");
const { HttpErrors } = require("../helpers");
const { hlpWrapper } = require("../helpers/hlpWrapper");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

const getAll = async (req, res, next) => {
  const contacts = await listContacts();

  res.status(200).json({
    contacts,
  });
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    throw HttpErrors(404, "Not found");
  }
  res.status(200).json({
    contact,
  });
};

const addNewContact = async (req, res) => {
  const { name, email, phone } = req.body;

  const { error } = schema.validate({ name, email, phone });
  if (error !== undefined) {
    
    let errorName = " ";
    error.details.map((item) => item.path.map((item) => (errorName = item)));
    throw HttpErrors (400, `missing required ${errorName} field`)
  
  }
  const result = await addContact(req.body);
  res.status(201).json({
    result,
  });
};

const removeContactById = async (req, res) => {
  const { contactId } = req.params;

  const deleteContact = await removeContact(contactId);
  if (!deleteContact) {
    throw HttpErrors(404, "Not found");
  }
  res.status(200).json({
    message: "contact deleted",
  });
};

const updateOldContact = async (req, res) => {
  const { contactId } = req.params;
  if (Object.keys(req.body).length === 0) {
    throw HttpErrors(400, "missing fields");
  }
  const result = await updateContact(contactId, req.body);
  if (!result) {
    throw HttpErrors(404, "Not found");
  }
  res.json(result);
};
module.exports = {
  getAll: hlpWrapper(getAll),
  getById: hlpWrapper(getById),
  addNewContact: hlpWrapper(addNewContact),
  removeContactById: hlpWrapper(removeContactById),
  updateOldContact: hlpWrapper(updateOldContact),
};
