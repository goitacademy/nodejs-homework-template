const Contact = require("../models/contacts");
const { contactSchema } = require("../shemas/contactsShemas");
const httpError = require("../helpers/httpError");

const getContacts = async (req, res, next) => {
  try {
    const data = await Contact.find({});
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    const data = await Contact.findById(contactId);
    if (data) {
      res.status(200).json(data);
    } else {
      throw httpError(404, `id ${contactId} Not found`);
    }
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    const data = await Contact.findOneAndDelete({ _id: contactId });
    if (data) {
      res.status(200).json({ message: "Contact deleted" });
    } else {
      //   res.status(404).json({ message: `id ${contactId} Not found` });
      throw httpError(404, `id ${contactId} Not found`);
    }
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  const { name, email, phone } = req.body;
  try {
    const { error } = contactSchema.validate({ name, email, phone });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const updatedContact = await Contact.findByIdAndUpdate(
      { _id: contactId },
      { name, email, phone },
      { new: true }
    );
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      throw httpError(404, `id ${contactId} Not found`);
    }
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const updatedFavorite = req.body.favorite;
    if (updatedFavorite === undefined) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    const updatedContact = await Contact.findByIdAndUpdate(
      { _id: contactId },
      { favorite: updatedFavorite },
      { new: true }
    );
    if (updatedContact) {
      return res.status(200).json(updatedContact);
    } else {
      throw httpError(404, `id ${contactId} Not found`);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
