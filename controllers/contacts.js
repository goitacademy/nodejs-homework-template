const { Contact } = require("../models/contact");

const getContacts = async (req, res) => {
  const contacts = await Contact.find({});
  return res.json({ status: "success", code: 200, data: { contacts } });
};

const getContactById = async (req, res) => {
  const contact = await Contact.findOne({ _id: req.params.contactId });
  if (contact) {
    res.json({ status: "success", code: 200, data: { contact } });
  } else {
    res.status(404).json({ status: "error", code: 404, message: "Not found" });
  }
};

const addContact = async (req, res) => {
  const contact = await Contact.create(req.body);
  return res
    .status(201)
    .json({ status: "success", code: 201, data: { contact } });
};

const updateContact = async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    {
      _id: req.params.contactId,
    },
    req.body,
    { new: true }
  );
  if (contact) {
    res.json({ status: "success", code: 200, data: { contact } });
  } else {
    res.status(404).json({ status: "error", code: 404, message: "Not found" });
  }
};

const deleteContact = async (req, res) => {
  const contact = await Contact.findByIdAndRemove({
    _id: req.params.contactId,
  });
  if (contact) {
    res.json({
      status: "success",
      code: 200,
      message: "Contact deleted",
    });
  } else {
    res.status(404).json({ status: "error", code: 404, message: "Not found" });
  }
};

const updateContactFavorite = async (req, res) => {
  const { favorite } = req.body;
  const contact = await Contact.findByIdAndUpdate(
    {
      _id: req.params.contactId,
    },
    { favorite },
    { new: true }
  );
  if (contact) {
    res.json({ status: "success", code: 200, data: { contact } });
  } else {
    res.status(404).json({ status: "error", code: 404, message: "Not found" });
  }
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
  updateContactFavorite,
};
