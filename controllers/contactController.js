const {
  getAllContacts,
  createContact,
  updateExistingContact,
  deleteContact,
  getContactById,
} = require("../services/contactService");

const fetchAll = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();
    res.json(contacts);
  } catch (err) {
    next(err);
  }
};

const fetchById = async (req, res, next) => {
  try {
    const contacts = await getContactById(req.params.id);
    if (contacts) {
      res.json(contacts);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const insertContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const newContact = await createContact({
      name,
      email,
      phone,
    });
    res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
};

const updateContactDetails = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const updatedContact = await updateExistingContact(id, {
      name,
      email,
      phone,
    });
    if (!updatedContact) {
      next();
    } else {
      res.json(updatedContact);
    }
  } catch (err) {
    next(err);
  }
};

const updateContactStatus = async (req, res, next) => {
  const { id } = req.params;
  const { favorite = false } = req.body;
  try {
    const updatedStatus = await updateExistingContact(id, { favorite });
    if (!updatedStatus) {
      next();
    } else {
      res.json(updatedStatus);
    }
  } catch (err) {
    next(err);
  }
};

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    await deleteContact(id);
    res.status(204).send({
      message: "Contact deleted!",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  fetchAll,
  fetchById,
  insertContact,
  updateContactDetails,
  removeContact,
  updateContactStatus,
};
