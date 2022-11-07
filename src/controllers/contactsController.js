const { Contact } = require("..models/contactModel");

const listContacts = async (req, res, next) => {
  const contacts = await Contact.find();

  res.status(200).json(contacts);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
};

const addContact = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  const newContact = await Contact.create(name, email, phone, favorite);

  res.status(201).json(newContact);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  await Contact.findByIdAndDelete(contactId);
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { name, email, phone, favorite },
    { new: true }
  );

  res.status(200).json(updatedContact);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (!favorite) {
    res.status(400).json({ message: "missing field favorite" });
  }

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );

  if (result) {
    res.status(200).json(result);
  }
  res.status(404).json({ message: " Not found " });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
