const { BadRequest, NotFound } = require("../helpers/errors");
const {
  getContacts,
  getContactsById,
  addContacts,
  updateContactsById,
  deleteContactsById,
  updateFavoriteById,
} = require("../services/contactsServices");

const getContactsController = async (req, res) => {
  const contacts = await getContacts();
  if (contacts.length < 1) {
    return res.json({ message: "There is no contacts" });
  }
  res.json({ contacts });
};

const getContactsByIdController = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactsById(id);
  if (!contact) {
    throw new BadRequest(`Contact with id ${id} not found`);
  }
  res.json({ contact });
};

const addContactsController = async (req, res) => {
  const contact = await addContacts(req.body);
  res.status(201).json({ contact });
};

const updateContactsByIdController = async (req, res) => {
  const { id } = req.params;
  const updateContact = await updateContactsById(id, req.body);
  if (!updateContact) {
    throw new NotFound(`Contact with id ${id} not found`);
  }
  res.json({ message: `contact with id:${id} updated` });
};

const deleteContactsByIdController = async (req, res) => {
  const { id } = req.params;
  const removeContact = await deleteContactsById(id);
  if (!removeContact) {
    throw new NotFound(`Contact with id ${id} not found`);
  }
  res.json({ message: `contact with id:${id} deleted` });
};

const updateFavoriteByIdController = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const updateFavorite = await updateFavoriteById(id, favorite);
  if (!updateFavorite) {
    throw new NotFound(`Contact with id ${id} not found`);
  }
  res.json({ message: `contact with id:${id} set favorite to ${favorite}` });
};

module.exports = {
  getContactsController,
  getContactsByIdController,
  addContactsController,
  updateContactsByIdController,
  deleteContactsByIdController,
  updateFavoriteByIdController,
};
