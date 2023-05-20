const contactsOperations = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");
const { contactValidate } = require("../schemas/contacts");
const getAll = async (req, res, next) => {
  const allContacts = await contactsOperations.listContacts();
  return res.status(200).json(allContacts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsOperations.getContactById(id);
  if (contact) {
    return res.status(200).json(contact);
  } else {
    throw HttpError(404, "Not found");
  }
};

const addCont = async (req, res, next) => {
  const { error } = contactValidate(req.body);
  if (error) {
    const errorMessage = error.details[0].message.replace(/['"]/g, "");
    const fieldName = errorMessage.split(" ")[0];
    return res
      .status(400)
      .json({ message: `missing required ${fieldName} field` });
  } else {
    const result = await contactsOperations.addContact(req.body);

    res.status(201).send(result);
  }
};

const updateCont = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    return res.status(400).json({ message: "missing fields" });
  } else {
    const { error } = contactValidate(req.body);
    if (error) {
      const errorMessage = error.details[0].message.replace(/['"]/g, "");
      const fieldName = errorMessage.split(" ")[0];
      return res
        .status(400)
        .json({ message: `missing required ${fieldName} field` });
    }
    const result = await contactsOperations.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  }
};

const deleteCont = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsOperations.removeContact(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "Contact deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addCont: ctrlWrapper(addCont),
  updateCont: ctrlWrapper(updateCont),
  deleteCont: ctrlWrapper(deleteCont),
};
