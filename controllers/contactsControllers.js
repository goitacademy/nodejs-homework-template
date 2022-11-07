const { Contact, schemas } = require("../models/contact");
const { RequestError } = require("../helpers/errors");

const listContacts = async (req, res) => {
  try {
    const contactsList = await Contact.find({});
    res.json(contactsList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  try {
    const contactById = await Contact.findById(contactId);

    if (!contactById) {
      throw RequestError(404, "Not found");
    }
    if (contactById) {
      return res.json(contactById);
    }
  } catch (error) {
    return res.json(error);
  }
};

const addContact = async (req, res) => {
  const { error, value: contactData } = schemas.joiSchema.validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newContact = await Contact.create(contactData);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;

  try {
    const status = await Contact.findByIdAndDelete(contactId);

    return status
      ? res.json({ message: "Contact deleted" })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const { error } = schemas.joiSchema.validate(req.body);

    if (error) {
      throw RequestError(400, "Missing fields");
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) {
      throw RequestError(404, "Not found");
    }
    if (result) {
      return res.json(result);
    }
  } catch (error) {
    return res.json(error);
  }
};

const updateFavorite = async (req, res) => {
  try {
    const { error } = schemas.updateFavoriteSchema.validate(req.body);

    if (error) {
      throw RequestError(400, "Missing field favorite");
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) {
      throw RequestError(404, "Not found");
    }
    if (result) {
      return res.json(result);
    }
  } catch (error) {
    return res.json(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
};
