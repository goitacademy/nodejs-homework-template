const { Contact } = require("../models/contacts");

const { ctrlWrapper } = require("../decorators/ctrl.Wrapper");

// const { HttpError } = require("../helpers/HttpError");

// const HttpError = require("../helpers/HttpError");
const {
  contactAddSchema,
  updateFavoriteSchema,
} = require("../schemas/contacts");

const listContacts = async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
};

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    return res.status(400).json({
      message: "Missing fields",
    });
  }

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: "missing required field: name, email, or phone",
    });
  }

  try {
    const newContact = await Contact.create({
      name,
      email,
      phone,
    });

    res.status(201).json({
      id: newContact._id,
      name: newContact.name,
      email: newContact.email,
      phone: newContact.phone,
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const result = await Contact.findById(req.params.contactId);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(result);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;

  if (!contactId) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json({
    message: "contact deleted",
  });
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    return res.status(400).json({
      message: "Missing field",
    });
  }

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: "missing required field: name, email, or phone",
    });
  }

  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, {
      name,
      email,
      phone,
    });

    if (!updatedContact) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    return res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const { error } = updateFavoriteSchema.validate({ favorite });

  if (error) {
    return res.status(400).json({
      message: `missing field favorite`,
    });
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
