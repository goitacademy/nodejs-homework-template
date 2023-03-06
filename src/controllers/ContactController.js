const {
  addContact,
  removeContact,
  getContactById,
  listContacts,
  updateContact,
} = require("../DbMethods");

const getContact = async (req, res, next) => {
  try {
    const contactList = await listContacts();

    res.status(200).json(contactList);
  } catch (error) {
    res.status(400).json(error);
  }
};

const fetchContactById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await getContactById(id);

    if (!contact) return res.status(404).json({ message: "Not found" });

    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const contact = await addContact(name, email, phone);

    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await removeContact(id);

    if (!result) return res.status(404).json({ message: "Not found" });

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

const editContact = async (req, res, next) => {
  try {
    const { body } = req;

    const id = req.params.contactId;
    const contact = await updateContact(id, body);

    if (contact.message === "Not found") {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getContact,
  fetchContactById,
  createContact,
  deleteContact,
  editContact,
};
