const {
  getContacts,
  addContact,
  deleteContact,
  getById,
  updateContact,
  patchFavorite,
} = require("../services/contactsServices");

const getContactsController = async (req, res) => {
  const { id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  const contacts = await getContacts(owner, skip, Number(limit));
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { id: owner } = req.user;
  const result = await getById(contactId, owner);
  res.json({
    status: "success",
    code: 200,
    data: {
      result: result,
    },
  });
};

const addContactController = async (req, res) => {
  const { id: owner } = req.user;
  const { name, email, phone, favorite } = req.body;
  const contact = await addContact({ name, email, phone, favorite }, owner);
  res.status(201).json({
    status: "success",
  });
};

const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const { id: owner } = req.user;
  const result = await deleteContact(contactId, owner);
  res.json({
    status: "success",
    code: 200,
    message: "Contact deleted",
    data: {
      result,
    },
  });
};

const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const { id: owner } = req.user;
  const { name, email, phone, favorite } = req.body;
  const result = await updateContact(
    contactId,
    {
      name,
      email,
      phone,
      favorite,
    },
    owner
  );
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};
const updateFavoriteController = async (req, res) => {
  const { favorite } = req.body;
  const { contactId } = req.params;
  const { id: owner } = req.user;
  const result = await patchFavorite(contactId, favorite, owner);
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateFavoriteController,
};
