const { Contacts } = require("../models/contactsModel");

const { cteateError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const result = await Contacts.find({}, "name email phone favorite");
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contacts.findById(contactId);

  if (!result) {
    throw cteateError(404, "Not found");
  }
  res.json(result);
};

const removeContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contacts.findByIdAndDelete(contactId);
  if (!result) {
    throw cteateError(404, "Not found");
  }
  res.json({ message: "Deleted successfully" });
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;
  const result = await Contacts.findByIdAndUpdate(
    contactId,
    {
      name,
      email,
      phone,
      favorite,
    },
    { new: true }
  );
  if (!result) {
    throw cteateError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await Contacts.create(req.body);
  res.status(201).json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contacts.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw cteateError(404, "Not found");
  }
  res.json(result);
};
module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContactById: ctrlWrapper(updateContactById),
  removeContactById: ctrlWrapper(removeContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
