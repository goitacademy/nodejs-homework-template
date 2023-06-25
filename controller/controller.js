const {
  listContacts,
  getContactById,
  addNewContact,
  removeContact,
  updateContact,
} = require("../dataBase/dbQueries.js");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: true } })
    .required(),
  phone: Joi.string()
    .pattern(/^(\(\d{3}\) \d{3}\-\d{4}|\d{3}\-\d{3}\-\d{4}|\d{9}|\d{10})$/)
    .required(),
  favorite: Joi.boolean().optional(),
});

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.status(200).json({ contacts });
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const requestedContact = await getContactById(req.params.contactId);

    if (!requestedContact)
      return res.status(404).send({ message: "Not found" });
    return res.status(200).json({ requestedContact });
  } catch (error) {
    next(error);
  }
};

const saveNewContact = async (req, res, next) => {
  const user = req.body;

  try {
    Joi.attempt(user, schema);
    const newUser = await addNewContact(user);
    return res.status(201).json({ newUser });
  } catch (error) {
    return res.status(400).send(error.details[0].message);
  }
};

const deleteContact = async (req, res, next) => {
  const contactToDelete = await removeContact(req.params.contactId);

  if (contactToDelete) {
    return res.status(200).json({ message: "Contact deleted" });
  } else {
    return res.status(404).send({ message: "Not found" });
  }
};

const changeContact = async (req, res, next) => {
  const updateSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: true } }),
    phone: Joi.string().pattern(
      /^(\(\d{3}\) \d{3}\-\d{4}|\d{3}\-\d{3}\-\d{4}|\d{9}|\d{10})$/
    ),
    favorite: Joi.boolean(),
  });
  try {
    const id = req.params.contactId;
    const body = req.body;

    Joi.attempt(body, updateSchema);
    const updatedContact = await updateContact(id, body);
    return res.status(200).json(updatedContact);
  } catch (error) {
    return res.status(400).send(error.details[0].message);
  }
};

const updateStatusContact = async (req, res, next) => {
  const statusSchema = Joi.object({
    favorite: Joi.boolean().required(),
  });
  try {
    const id = req.params.contactId;
    const body = req.body;

    Joi.attempt(body, statusSchema);
    const contactWithNewStatus = await updateContact(id, body);
    return res.status(200).json(contactWithNewStatus);
  } catch (error) {
    return res.status(400).send(error.details[0].message);
  }
};

module.exports = {
  getAllContacts,
  getContact,
  saveNewContact,
  deleteContact,
  changeContact,
  updateStatusContact,
};
