const { compile } = require("joi");
const { Contact } = require("../models/contacts");
const { HttpErrors } = require("../utils");

const getAll = async (req, res, next) => {
  const allContacts = await Contact.find({});
  console.log("work", allContacts);
  res.json({
    status: "success",
    code: 200,
    data: { allContacts },
  });
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw HttpErrors(404, "Not found contact");
  }
  return res.json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
};
const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);
  const deletedContact = await Contact.findByIdAndRemove(contactId);
  if (!deletedContact) {
    throw HttpErrors(404, "Not found contact");
  }
  res.json({ message: "contact deleted" });
};

const addContact = async (req, res, next) => {
  const body = req.body;
  const newContact = await Contact.create(body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      newContact,
    },
  });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  // console.log(contactId)
  const body = req.body;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpErrors(404, "Not found contact");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      updatedContact,
    },
  });
};
const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  res.json({
    status: "success",
    code: 200,
    data: {
      updatedContact,
    },
  });
};
module.exports = {
  updateFavorite,
  updateById,
  addContact,
  deleteById,
  getById,
  getAll,
};
