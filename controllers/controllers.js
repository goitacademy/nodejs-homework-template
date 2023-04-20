const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getAllContacts = async (req, res) => {
  try {
    const contacts = await listContacts();
    return res.status(200).json({ contacts });
  } catch (error) {
    console.log(error.message);
  }
};

const getContact = async (req, res) => {
  try {
    const contactById = await getContactById(req.params.contactId);
    if (!contactById) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ contactById, message: "success" });
  } catch (error) {
    console.log(error.message);
  }
};

const postContact = async (req, res) => {
  try {
    const contact = await addContact(req.body);
    res.status(201).json({ contact, message: "success" });
  } catch (error) {
    console.log(error.message);
  }
};

const delContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    await removeContact(contactId);
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    console.log(error.message);
  }
};

const putContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    const result = await updateContact(contactId, req.body);

    res.status(200).json({ result, message: "success" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAllContacts,
  getContact,
  postContact,
  delContact,
  putContact,
};
