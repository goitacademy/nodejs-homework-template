const Joi = require("joi");
const service = require("../service/index");

const listContacts = async (res) => {
  try {
    const results = await service.getAllContacts();
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getContactById = async (contactId, res) => {
  try {
    const results = await service.getContactById(contactId);
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const removeContact = async (contactId, res) => {
  try {
    const results = await service.removeContact(contactId);
    if (!results) res.status(404).json({ message: "Not found" });
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const addContact = async (req, res) => {
  const { name, email, phone, favorite } = req.body;

  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/),
    favorite: Joi.boolean(),
  });
  const bodyIsValid = schema.validate({
    name: name,
    email: email,
    phone: phone,
    favorite: favorite,
  });

  if (bodyIsValid.error) {
    res.status(400).json({ message: bodyIsValid.error.message });
    return;
  }

  if (name && email && phone) {
    try {
      const results = await service.createContact(req.body);
      res.status(201).json(results);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  res.status(400).json({ message: "missing field body" });
};

const updateContact = async (contactId, body, res) => {
  const { name, email, phone } = body;

  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/),
  });
  const bodyIsValid = schema.validate({
    name: name,
    email: email,
    phone: phone,
  });

  if (bodyIsValid.error) {
    res.status(400).json({ message: bodyIsValid.error.message });
    return;
  }

  if (name || email || phone) {
    try {
      const results = await service.updateContact(contactId, body);
      res.status(200).json(results);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  res.status(400).json({ message: "missing field body" });
};

const updateStatusContact = async (contactId, body, res) => {
  const { favorite } = body;

  const schema = Joi.object({
    favorite: Joi.boolean(),
  });
  const bodyIsValid = schema.validate({
    favorite: favorite,
  });

  if (bodyIsValid.error) {
    res.status(400).json({ message: bodyIsValid.error.message });
    return;
  }

  if (favorite || favorite === false) {
    try {
      const results = await service.updateStatusContact(contactId, body);
      res.status(200).json(results);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
  res.status(400).json({ message: "missing field favorite" });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
