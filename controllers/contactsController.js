const { Contact } = require("../models/contactModel");

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = page * limit - limit;
  const contacts = await Contact.find({ owner }).skip(skip).limit(limit);

  if (!favorite) {
    res.status(200).json({ contacts });
  } else {
    const favoriteContacts = contacts.filter(
      (contact) => contact.favorite === true
    );
    res.status(200).json({ favoriteContacts });
  }
};

const getContactById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const contact = await Contact.findOne({ owner, _id: contactId });
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ contact });
};

const removeContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const contactToDelete = await Contact.findOneAndRemove({
    _id: contactId,
    owner,
  });
  if (!contactToDelete) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "contact deleted" });
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const contact = new Contact({ owner, ...req.body });
  await contact.save();
  return res.status(201).json({ contact });
};

const updateContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const contact = await Contact.findOneAndUpdate(
    { owner, _id: contactId },
    {
      $set: { name, email, phone },
    }
  );
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ contact });
};

const updateStatusContact = async (req, res) => {
  const { _id: owner } = req.user;

  const { contactId } = req.params;
  const { favorite } = req.body;
  const contact = await Contact.findOneAndUpdate(
    { owner, _id: contactId },
    { favorite },
    { new: true }
  );
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ contact });
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
