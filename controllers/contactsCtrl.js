const { Contact, joiSchema } = require("../models/contactModel");
const { HttpError } = require("../helpers");

const listContacts = async (req, res, next) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.status(200).json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    return res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  const { body } = req;
  try {
    console.log(body);
    const { error } = joiSchema.validate(body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await Contact.create(body);
    console.log(result);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
  // const doesExist = Contact.exists({
  //   $or: [{ email: body.email }, { phone: body.phone }],
  // });
  // if (doesExist === null) {
  //   const newContact = Contact.create(body);
  //   return newContact;
  // }
  // return "Contact already exists";
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  try {
    if (!body) {
      throw HttpError(400, "missing fields");
    }
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    if (!updatedContact) {
      throw HttpError(404, "Not found");
    }
    return res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  try {
    if (!body) {
      throw HttpError(400, "missing field favorite");
    }
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    if (!updatedContact) {
      throw HttpError(404, "Not found");
    }
    return res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
