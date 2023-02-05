const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../services/contactsService");

const getContactsController = async (req, res, next) => {
  try {
    const contacts = await listContacts(req.user.id);
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactByIdController = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId, req.user.id);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const addContactController = async (req, res, next) => {
  try {
    const contact = await addContact({ ...req.body, owner: req.user.id });
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

const deleteContactController = async (req, res, next) => {
  try {
    console.log("Hello");
    await removeContact(req.params.contactId, req.user.id);
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContactController = async (req, res, next) => {
  try {
    const contact = await updateContact(
      req.params.contactId,
      req.user.id,
      req.body
    );
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const updateFavoriteController = async (req, res, next) => {
  try {
    const contact = await updateStatusContact(
      req.params.contactId,
      req.user.id,
      req.body
    );
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateFavoriteController,
};
