const { Contact, addSchema, addStatusSchema } = require("../models/contact");
const { HttpError } = require("../helpers");

const getListContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await Contact.findById(contactId);
    if (!result) {
      throw new HttpError(404, "Contact not found");
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};
const createContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw new HttpError(400, error.message);
    }
    const result = await Contact.create(req.body);

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await Contact.findByIdAndDelete(contactId);

    if (!result) {
      throw new HttpError(404, "Not found");
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = addSchema.validate(req.body);

    if (error) {
      throw new HttpError(400, "missing fields");
    }

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) {
      throw new HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = addStatusSchema.validate(req.body);

    if (error) {
      throw new HttpError(400, "missing fields");
    }

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw new HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getListContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
};
