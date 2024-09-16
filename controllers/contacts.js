const { Contact } = require("../models/contact.js");

const { HttpError, wrapController } = require("../helpers");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const query = { owner };

  if (favorite === "true") {
    query.favorite = true;
  } else if (favorite === "false") {
    query.favorite = false;
  }

  const contacts = await Contact.find(query, "-createdAt -updatedAt", {
    skip,
    limit,
  })
    .populate("owner", "email subscription")
    .exec();

  res.status(200).json(contacts);
};


const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId).exec();

  if (contact !== null) {
      throw HttpError(404);
  }

  res.status(200).json(contact);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const doc = await Contact.create({ ...req.body, owner });

  res.status(201).json(doc);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndDelete(contactId).exec();

  if (contact !== null) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    throw HttpError(404);
  }
};
const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (result) {
    res.status(200).json(result);
  } else {
    throw HttpError(404);
  }
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite = false } = req.body;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  ).exec();

  if (result) {
    res.status(200).json(result);
  } else {
    throw HttpError(404);
  }
};

module.exports = {
  listContacts: wrapController(listContacts),
  getById: wrapController(getById),
  addContact: wrapController(addContact),
  removeContact: wrapController(removeContact),
  updateContact: wrapController(updateContact),
  updateStatusContact: wrapController(updateStatusContact),
};
