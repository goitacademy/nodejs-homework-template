

const contacts = require('../models/contacts');

const { HttpError, ctrlWrapper } = require("../helpers");



const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);

}

const getContactById = async (req, res) => {
  const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
}

const addContact = async (req, res) => {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } 

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Contact deleted"
    // res.status(204).send()
  })
}

const upDateById = async (req, res) => {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateById(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
}

module.exports = {
    getAll: ctrlWrapper(getAll),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    upDateById: ctrlWrapper(upDateById),
}
