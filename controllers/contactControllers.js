const AppError = require("../helpers/AppError");
// const contacts = require("../models/contacts");
const {
  contactsValidationSchema,
} = require("../helpers/contactsValidator");
const Contact = require("../models/contactsModel");

exports.listContacts = async (req, res, next) => {
  try {
    const allContacts = await Contact.find();
    if (!allContacts) {
      throw AppError(404, "Not found");
    }
    res.status(200).json({
      message: "template message",
      contacts: allContacts,
    });
  } catch (error) {
    next(error);
  }
};

exports.getContactById = async (
  req,
  res,
  next
) => {
  try {
    const { contactId } = req.params;
    const contactById = await Contact.findById(
      contactId
    );
    if (!contactById) {
      throw AppError(404, "Not found");
    }
    res.status(200).json({
      message: "Contact got by id",
      contactById: contactById,
    });
  } catch (error) {
    next(error);
  }
};
exports.addContact = async (req, res, next) => {
  try {
    const { error, value } =
      contactsValidationSchema(req.body);
    if (error) {
      throw AppError(404, error.message);
    }
    const result = await Contact.create(value);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

exports.removeContact = async (
  req,
  res,
  next
) => {
  try {
    const { contactId } = req.params;
    const result =
      await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw new AppError(404, "Not Found");
    }
    res.status(200).json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
};
exports.updateContact = async (
  req,
  res,
  next
) => {
  try {
    const { error, value } =
      contactsValidationSchema(req.body);
    if (error) {
      throw AppError(404, error.message);
    }
    const { contactId } = req.params;
    const result =
      await Contact.findByIdAndUpdate(
        contactId,
        value
      );
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
exports.updateContactsFavorite = async (
  req,
  res,
  next
) => {
  try {
    const { contactId } = req.params;
    if (req.body.favorite) {
      const result =
        await Contact.findByIdAndUpdate(
          contactId,
          req.body
        );
      res.status(201).json(result);
    } else {
      throw AppError(
        400,
        "missing field favorite"
      );
    }
  } catch (error) {
    next(error);
  }
};
