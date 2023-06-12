const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../service/index");

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
  try {
    const result = await getContactById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (e) {
    console.log(e.message);
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
  const contact = await getContactById(id);
  try {
    if (!contact) {
      return res.status(404).send({ message: "Not found" });
    } else {
      const filteredContacts = await removeContact(id);
      return res.status(200).json(filteredContacts);
    }
  } catch (e) {
    console.log(e.message);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    if (!name && !email && !phone) {
      return res.status(400).send({ message: "missing fields" });
    }
    if (name || email || phone) {
      const updatedContact = await updateContact(id, { name, email, phone });
      if (!updatedContact) {
        return res.status(404).send({ message: "Not found" });
      }
      return res.status(200).json(updatedContact);
    }
  } catch (e) {
    console.log(e.message);
  }
};

const changeStatus = async (req, res, next) => {
  const { id } = req.params;
  const { isFavorite = true } = req.body;
  try {
    const updatedContact = await updateContact(id, { favorite: isFavorite });
    if (updatedContact) {
      return res.status(200).json(updatedContact);
    } else {
      return res.status(404).send({ message: "Not found" });
    }
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
