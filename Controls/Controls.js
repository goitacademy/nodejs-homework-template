const {
  getContacts,
  getContactsById,
  getAddContacts,
  getDeleteContacts,
  getUpdateContacts,
  getUpdateStatusContacts,
} = require("../services/contactsServices.js");

const listContactsControls = async (req, res, next) => {
  try {
    const data = await getContacts();
    return res.json(data);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const getContactByIdControls = async (req, res, next) => {
  try {
    const data = await getContactsById(req.params.contactId);
    if (data) {
      return res.json(data);
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const removeContactControls = async (req, res, next) => {
  try {
    const dataId = await getDeleteContacts(req.params.contactId);
    if (dataId.deletedCount) {
      return res.status(200).json({ message: "contact deleted" });
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const addContactControls = async (req, res, next) => {
  try {
    await getAddContacts(req.body);
    return res.status(201).json({ message: "add contact" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateContactControls = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  if (!req.body) {
    return res.status(400).json({ message: "missing fields" });
  }
  const dataId = getUpdateContacts(req.params.contactId, {
    name,
    email,
    phone,
    favorite,
  });

  if (!dataId) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "contact update" });
};

const updateStatusContactControls = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const { name, phone, email, favorite } = req.body;
  const dataId = getUpdateStatusContacts(req.params.contactId, {
    name,
    email,
    phone,
    favorite,
  });
  if (!dataId) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "contact update" });
};

module.exports = {
  listContactsControls,
  getContactByIdControls,
  removeContactControls,
  addContactControls,
  updateContactControls,
  updateStatusContactControls,
};
