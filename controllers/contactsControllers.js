const { Contact } = require("../models/contact");
const { ctrlWrapper } = require("../helpers");
// const { HttpError } = require("../helpers");

const getAllContacts = async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
};

const addContact = async (req, res, next) => {
  const result = await Contact.create(req.body);
  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(201).json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(contact);
};

const updateContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      res.status(400).json({ message: "missing fields" });
    }
    res.status(200).json(result);
  } catch (error) {
    next(res.status(404).json({ message: "Not found" }));
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      res.status(400).json({ message: "missing field favorite" });
    }
    res.status(200).json(result);
  } catch (error) {
    next(res.status(404).json({ message: "Not found" }));
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: `contact deleted` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  addContact: ctrlWrapper(addContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  getContactById: ctrlWrapper(getContactById),
  updateContactById: ctrlWrapper(updateContactById),
  deleteContact: ctrlWrapper(deleteContact),
};
