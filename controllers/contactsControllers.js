const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getContacts = async (req, res, next) => {
  res.json(await listContacts());
};

const getContactId = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      return res
        .status(400)
        .json({ message: `Contact with id:${contactId} not found` });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};
const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    contact === false
      ? res.status(404).json({ message: `Not Found id:${contactId}` })
      : res.status(200).json({ message: `contact id:${contactId} deleted` });
  } catch (error) {
    next(error);
  }
};
const addNewContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    await addContact(name, email, phone);
    res.status(201).json({ status: "success" });
  } catch (error) {
    console.log(error);
  }
};
const updtContact = async (req, res) => {
  try {
    const { contactId } = req.params;

    const updatedContact = await updateContact(contactId, req.body);

    if (!updatedContact) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.status(200).json({ status: "success" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getContacts,
  getContactId,
  deleteContact,
  addNewContact,
  updtContact,
};
