const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require("../services/contactService");
const errorHandler = require("../errorHandler");

const listContacts = async (req, res, next) => {
  try {
    const contacts = await getAll();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getById(id);

    if (!contact) {
      errorHandler(404, "Not Found");
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contact = await create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    if (error.message.includes("duplicate")) {
      error.status = 400;
    }
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await deleteById(id);
    if (!contact) {
      errorHandler(404, "Not Found");
    }
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedContact = req.body;
    const contact = await updateById(id, updatedContact);
    if (!contact) {
      errorHandler(404, "Not Found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
