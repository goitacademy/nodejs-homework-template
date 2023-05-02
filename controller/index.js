const service = require("../service");
const { RequestError } = require("../helpers");
const {
  addContactSchema,
  updateContactSchema,
  updateStatusSchema,
} = require("../schemas/contacts");
const get = async (req, res, next) => {
  try {
    res.json({
      code: 200,
      message: await service.getAllContacts(),
    });
  } catch (error) {
    next(error);
  }
};
const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await service.getContactById(contactId);
    if (!result) {
      throw RequestError(404, "Not Found");
    }
    res.json({ code: 200, message: result });
  } catch (error) {
    next(error);
  }
};
const addContact = async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "missing required name field");
    }
    const contact = await service.addContact(req.body);
    res.status(201).json({
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
};
const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await service.removeContact(contactId);
    if (!result) {
      throw RequestError(404, "Not Found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};
const updateContact = async (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "missing fields");
    }
    const { contactId } = req.params;
    const result = await service.updateContact(contactId, { ...req.body });
    if (!result) {
      throw RequestError(404, "Not Found");
    }
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
};
const updateFavorite = async (req, res, next) => {
  try {
    const { error } = updateStatusSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "missing field favorite");
    }
    const { contactId } = req.params;
    const result = await service.updateStatusContact(contactId, req.body);
    if (!result) {
      throw RequestError(404, "Not Found");
    }
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  get,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
};
