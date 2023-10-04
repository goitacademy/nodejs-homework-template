const {
  listContactsService,
  getByIdService,
  addContactService,
  updateContactService,
  removeContactService,
} = require("../services/contactServices");

const getAllContacts = async (req, res, next) => {
  const contacts = await listContactsService();
  res.json(contacts);
};

const getOneContact = async (req, res, next) => {
  const { id } = req.params;

  try {
    const contact = await getByIdService(id);
    res.json(contact);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

const createContact = async (req, res, next) => {
  try {
    const newContact = await addContactService(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

// true-пустой
const updateContact = async (req, res, next) => {
  if (isEmptyObject(req.body)) {
    return res.status(400).json({ message: "missing fields" });
  }
  try {
    const { id } = req.params;
    const updatedContact = await updateContactService(id, req.body);
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    await removeContactService(id);
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  createContact,
  updateContact,
  deleteContact,
};
