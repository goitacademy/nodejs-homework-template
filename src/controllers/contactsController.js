const Contact = require("../models/contactsModel");

const getAllContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing required name field" });
  }
  const newContact = await Contact.create({ name, email, phone });
  res.status(201).json(newContact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const isRemoved = await Contact.findByIdAndDelete(id);
  if (isRemoved) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  if (Object.keys(update).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }
  const updatedContact = await Contact.findByIdAndUpdate(id, update, {
    new: true,
  });
  if (updatedContact) {
    res.status(200).json(updatedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const updateFavoriteStatus = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );

  if (updatedContact) {
    res.status(200).json(updatedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContactById,
  updateFavoriteStatus,
};
