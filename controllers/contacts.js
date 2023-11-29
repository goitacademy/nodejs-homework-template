const { Contact } = require("../models/contact");
const { ctrlWrapper, HttpError } = require("../helpers");

const listContacts = async (req, res, next) => {
  const contacts = await Contact.find();
  console.log();
  res.send(contacts);
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw new HttpError(404, "Not found");
    }
    res.send(contact);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  try {
    const contact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndDelete(contactId);
  if (!contact) {
    throw new HttpError(404, "Not found");
  }
  res.json({
    message: "delete success",
  });
};

const addContact = async (name, email, phone, next) => {
  try {
    const newContact = await Contact.create({ name, email, phone });
    return newContact;
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const contacts = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!contacts) {
    throw new HttpError(404, "Not found");
  }

  res.send(contacts);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
