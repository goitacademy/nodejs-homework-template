const {
  listContacts,
  getContactById,
  addContact,
  changeContactById,
  patchContactById,
  removeContactById,
} = require("../services/contactsService");

const getContactsController = async (req, res, next) => {
  const { _id: owner } = req.user;
  let { page = 1, limit = 20, favorite } = req.query;
  let skip = 0;
  page = parseInt(page);
  limit = parseInt(limit);

  if (page === 1) {
    skip = 0;
  } else {
    skip = (page - 1) * limit;
  }

  const contacts = await listContacts(owner, {
    skip,
    limit,
    favorite,
  });

  if (!contacts) {
    return res.status(400).json({ message: "Contacts not found" });
  }

  res.status(200).json({ contacts, page, limit });
};

const getContactByIdController = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const contact = await getContactById(owner, contactId);

  if (!contact) {
    return res.status(400).json({ message: "Contact not found" });
  }

  res.status(200).json({ contact });
};

const addPostController = async (req, res, next) => {
  const { _id: owner } = req.user;
  const contact = await addContact(owner, req.body);
  res.status(201).json(contact);
};

const changePostController = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const changeContact = await changeContactById(owner, contactId, req.body);

  if (!changeContact) {
    return res.status(400).json({ message: "Not found" });
  }

  res.status(200).json(changeContact);
};

const patchPostController = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const updateContact = await patchContactById(owner, contactId, req.body);

  if (!updateContact) {
    return res.status(400).json({ message: "Not found" });
  }

  res.status(200).json(updateContact);
};

const removePostController = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  await removeContactById(owner, contactId);
  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addPostController,
  changePostController,
  patchPostController,
  removePostController,
};
