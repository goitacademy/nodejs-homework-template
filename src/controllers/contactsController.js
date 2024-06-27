const Contact = require("../models/contactsModel");

const getAllContacts = async (req, res) => {
  const userId = req.user._id;
  const contacts = await Contact.find({ owner: userId });
  res.status(200).json(contacts);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const contact = await Contact.findOne({ _id: id, owner: userId });
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const userId = req.user._id;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing required name field" });
  }
  const newContact = await Contact.create({
    name,
    email,
    phone,
    owner: userId,
  });
  res.status(201).json(newContact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const isRemoved = await Contact.findOneAndDelete({ _id: id, owner: userId });
  if (isRemoved) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  const userId = req.user._id;
  if (Object.keys(update).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    update,
    {
      new: true,
    }
  );
  if (updatedContact) {
    res.status(200).json(updatedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const updateFavoriteStatus = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const userId = req.user._id;

  if (favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  const updatedContact = await Contact.findOneAndUpdate(
    { _id: id, owner: userId },
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
