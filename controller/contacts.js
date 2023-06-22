const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../service/index");

const { Types } = require("mongoose");

const get = async (req, res, next) => {
  try {
    const result = await getAllContacts();
    res.status(200).json(result);
  } catch (e) {
    console.log(e.message);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) {
    res.status(404).send({ message: "not found" });
    return;
  }
  try {
    const result = await getContactById(id);
    res.status(200).json(result);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: "Server error" });
  }
};
const create = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    if (!name || !email || !phone) {
      return res.status(404).send({ message: "missing required name - field" });
    } else {
      const newContact = await addContact(name, email, phone);
      return res.status(201).json(newContact);
    }
  } catch (e) {
    console.log(e.message);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) {
    res.status(404).send({ message: "not found" });
    return;
  }
  try {
    const filteredContacts = await removeContact(id);
    return res.status(200).json(filteredContacts);
  } catch (e) {
    console.log(e.message);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  if (!Types.ObjectId.isValid(id)) {
    res.status(404).send({ message: "not found" });
    return;
  }

  try {
    if (!name && !email && !phone) {
      return res.status(400).send({ message: "missing fields" });
    }
    if (name || email || phone) {
      const updatedContact = await updateContact(id, { name, email, phone });
      return res.status(200).json(updatedContact);
    }
  } catch (e) {
    console.log(e.message);
  }
};

const changeStatus = async (req, res, next) => {
  const { id } = req.params;
  const { isFavorite = true } = req.body;

  if (!Types.ObjectId.isValid(id)) {
    res.status(404).send({ message: "not found" });
    return;
  }

  try {
    const updatedContact = await updateContact(id, { favorite: isFavorite });
    return res.status(200).json(updatedContact);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
  changeStatus,
};
