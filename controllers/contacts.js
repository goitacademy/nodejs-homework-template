const { Contact } = require("../models/contact");
const { HttpError } = require("../helpers/index");

const listContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await Contact.findById(contactId.slice(1));

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ status: "success", result });
  } catch (err) {
    next(err);
  }
};

const addContact = async (req, res, next) => {
  const { email } = req.body;

  const isContactExist = await Contact.findOne({ email });

  console.log("isContactExist: ", isContactExist);
  if (isContactExist) {
    return res.status(200).json({ message: "Email is already taken" });
  }

  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res, next) => {
  try {
    const result = await Contact.findByIdAndRemove(
      req.params.contactId.slice(1)
    );

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (err) {
    next(err);
  }
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId.slice(1), req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateStatusContact,
};
