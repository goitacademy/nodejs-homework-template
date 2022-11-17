const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models");

const getContacts = async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ data: contacts });
};
const getContactByID = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(
      contactId
    ); /* выбросит ошибку если contactId не валиден, вернеи null, если валидный contactId не найден */
    if (!contact) {
      throw new Error("contact's id is not found");
    }
    res.status(200).json({ data: contact });
  } catch (error) {
    error.status = 404;
    throw error;
  }
};
const postContact = async (req, res, next) => {
  const newContact = await addContact(req.body);
  res.status(201).json({ data: newContact });
};
const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await removeContact(
      contactId
    ); /* выбросит ошибку если contactId не валиден, вернеи null, если валидный contactId не найден */
    if (!contact) {
      throw new Error("contact's id is not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    error.status = 404;
    throw error;
  }
};
const putContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const updatedContact = await updateContact(
      contactId,
      req.body
    ); /* выбросит ошибку если contactId не валиден, вернеи null, если валидный contactId не найден */
    if (!updatedContact) {
      throw new Error("contact's id is not found");
    }
    res.status(200).json({ data: updatedContact });
  } catch (error) {
    error.status = 404;
    throw error;
  }
};

module.exports = {
  getContacts,
  getContactByID,
  postContact,
  deleteContact,
  putContact,
};
