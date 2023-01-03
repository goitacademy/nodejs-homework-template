const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("/nodejs-homework-template-vm/models/contacts");

const { Contact } = require("../db/contactModel");
const getContacts = async (req, res) => {
  const { _id } = req.user;

  console.log(req.user);
  const contacts = await listContacts(_id);
  res.status(201).json({ contacts });
};
const getContactsById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const contactbyId = await Contact.find({
    $and: [{ owner: _id }, { _id: contactId }],
  });

  if (!contactbyId) {
    res.status(400).json({ message: "not found", code: 400 });
  }
  res.status(200).json({ message: "success", code: 200, contactbyId });
};
const addContacts = async (req, res) => {
  const { _id } = req.user;
  console.log(req.user);
  const { name, email, phone, favorite = false } = req.body;
  if (!name || !email || !phone) {
    res.status(400).json({ message: "missing required name field" });
    return;
  }
  const contact = new Contact({ name, email, phone, favorite, owner: _id });

  const newContact = await contact.save();
  res.status(201).json({ message: "contact added", newContact });
};
const putContacts = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing field" });
  }
  const contactByUpdate = await Contact.findOneAndUpdate(
    { $and: [{ owner: _id }, { _id: contactId }] },
    { $set: req.body },
    { runValidators: true, new: true }
  );
  console.log(contactByUpdate);
  if (!contactByUpdate) {
    res.status(400).json({ message: "Not found" });
  }
  res.status(201).json({ message: "contact update", contactByUpdate });
};
const removeContacts = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const isContactDeleted = await Contact.findOneAndRemove({
    $and: [{ owner: _id }, { _id: contactId }],
  });
  if (!isContactDeleted) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted", isContactDeleted });
};
const putContactsFav = async (req, res) => {
  const { favorite } = req.body;
  const { contactId } = req.params;
  const { _id } = req.user;
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing field favorite" });
  }

  const updatedContact = await Contact.findOneAndUpdate(
    { $and: [{ owner: _id }, { _id: contactId }] },
    { favorite },
    { runValidators: true, new: true }
  );

  if (!updatedContact) {
    res.status(400).json({ message: "Not found" });
  }
  res.status(200).json({ message: "success", contact: updatedContact });
};
const patchUserAvatarController = async (req, res) => {
  const { filename } = req.file;
  const { _id } = req.user;
  const updatedUser = await uploadUserAvatar(_id, filename);

  res.status(200).json({ status: "success", user: updatedUser });
};

module.exports = {
  getContacts,
  addContacts,
  getContactsById,
  putContacts,
  patchUserAvatarController,
  removeContacts,
  putContactsFav,
};
