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
  const { _id: userId } = req.user;

  let { page = 1, limit = 10, ...filters } = req.query;
  page = parseInt(page) - 1;
  limit = parseInt(limit);
  const contacts = await getContacts(userId, page, limit, filters);
  res.json({ contacts });
};

const getContactsByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { postId } = req.params;
  const contact = await getContactsById(postId, userId);
  if (!contact) {
    throw new BadRequest(`Contact with id ${postId} not found`);
  }
  res.json({ contact });
};

const addContactsController = async (req, res) => {
  const { _id: userId } = req.user;
  const body = req.body;

  const contact = await addContacts(body, userId);
  res.status(201).json({ contact });
};

const updateContactsByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { postId } = req.params;
  const updateContact = await updateContactsById(postId, req.body, userId);
  if (!updateContact) {
    throw new NotFound(`Contact with id ${postId} not found`);
  }
  res.json({ message: `contact with id:${postId} updated` });
};

const deleteContactsByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { postId } = req.params;
  const removeContact = await deleteContactsById(postId, userId);
  if (!removeContact) {
    throw new NotFound(`Contact with id ${postId} not found`);
  }
  res.json({ message: `contact with id:${postId} deleted` });
};

const updateFavoriteByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { postId } = req.params;
  const { favorite } = req.body;
  if (favorite) {
    throw new BadRequest("missing field favorite");
  }
  const updateFavorite = await updateFavoriteById(postId, favorite, userId);
  if (!updateFavorite) {
    throw new NotFound(`Contact with id ${postId} not found`);
  }
  res.json({
    message: `contact with id:${postId} set favorite to ${favorite}`,
  });
};

module.exports = {
  getContactsController,
  getContactsByIdController,
  addContactsController,
  updateContactsByIdController,
  deleteContactsByIdController,
  updateFavoriteByIdController,
};
