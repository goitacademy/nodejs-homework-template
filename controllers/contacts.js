const Joi = require("joi");
const { HttpErrors } = require("../helpers");

const { ContactModel } = require("../models/contacts");

const { hlpWrapper } = require("../helpers/hlpWrapper");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

const getAll = async (req, res) => {
  const contacts = await ContactModel.find();

  res.status(200).json({
    contacts,
  });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await ContactModel.findById(contactId);

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
    throw HttpErrors(400, `missing required ${errorName} field`);
  }
  const result = await ContactModel.create({
    name,
    email,
    phone,
  });
  res.status(201).json({
    result,
  });
};

const removeContactById = async (req, res) => {
  const { contactId } = req.params;

  const deleteContact = await ContactModel.findByIdAndDelete(contactId);
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
  const result = await ContactModel.findByIdAndUpdate(contactId, req.body, {new: true})
  
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
