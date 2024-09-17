const contactsService = require("../models");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const allContacts = async (req, res) => {
    const result = await contactsService.listContacts();
    res.json(result);
};

const oneContact = async (req, res) => {
     const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404, `Contact not found`);
    }
    res.json(result);
};

const addOneContact = async (req, res) => {
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
};

const deleteContact = async (req, res) => {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
      throw HttpError(404, `Contact not found`);
    }
    res.json({ message: "contact deleted" });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const updatedFields = {};
  if (name) {
    updatedFields.name = name;
  }
  if (email) {
    updatedFields.email = email;
  }
  if (phone) {
    updatedFields.phone = phone;
  }

  const result = await contactsService.updateContactById(id, updatedFields);
  if (!result) {
    throw HttpError(404, `Contact not found`);
  }
  res.json(result);
};

module.exports = {
  allContacts: ctrlWrapper(allContacts),
  oneContact: ctrlWrapper(oneContact),
  addOneContact: ctrlWrapper(addOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateById: ctrlWrapper(updateById),
};
