const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

// GET ============================================
const controllerGetAll = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
  }
};

// GET by ID =======================================
const controllerGetById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);
    if (!contact) {
      return res.status(404).json({ message: "User wasn`t found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.log(error);
  }
};

// POST ============================================
const controllerPost = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    const body = {
      name,
      email,
      phone,
    };

    const newContact = await addContact(body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT ============================================
const controllerPut = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const body = {
    name,
    email,
    phone,
  };

  const updatedContact = await updateContact(id, body);
  if (!updatedContact) {
    return res.status(404).json({ message: "Contact wasn`t found" });
  }
  res.status(200).json(updatedContact);
};

// DELETE ========================================
const controllerDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    await removeContact(id);
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  controllerGetAll,
  controllerGetById,
  controllerPost,
  controllerPut,
  controllerDelete,
};
