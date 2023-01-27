const serviceContact = require("../services/contactsService");
const {
  schema,
  schemaFavorite,
} = require("../../src/middlewares/validationMiddleware");

const listContactsController = async (req, res, next) => {
  const contacts = await serviceContact.listContacts();
  res.status(200).json({ contacts, status: "success" });
};

const getContactByIdController = async (req, res, next) => {
  const contactId = await serviceContact.getContactById(req.params.id);
  contactId
    ? res.status(200).json({ contactId, status: "success" })
    : res.status(404).json({ message: "ID not found" });
};

const addContactController = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { error } = schema.validate({ name, email, phone });
  if (error) {
    res.status(400).json(error.details[0].message);
    return;
  }
  const newContacts = await serviceContact.addContact(req.body);

  res.status(201).json({ newContacts, status: "success" });
};

const removeContactController = async (req, res, next) => {
  const deleteContact = await serviceContact.removeContact(req.params.id);
  deleteContact
    ? res
        .status(200)
        .json({ message: `Contact with ID:${req.params.id} has been deleted` })
    : res.status(404).json({ message: "ID not found" });
};

const updateContactController = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  const { name, email, phone } = body;
  const { error } = schema.validate({ name, email, phone });
  if (error) {
    res.status(400).json(error.details[0].message);
    return;
  }
  const updateContact = await serviceContact.updateContact(id, body);
  if (updateContact) {
    res.status(200).json({ status: "success" });
  } else {
    res.status(404).json({ message: "ID Not found" });
  }
};

const favoriteContactController = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  const { favorite } = body;
  const { error } = schemaFavorite.validate({ favorite });
  if (error) {
    res.status(400).json(error.details[0].message);
    return;
  }
  const favoriteId = await serviceContact.favoriteContact(id, body);

  if (favoriteId) {
    if (!favorite) {
      res.status(400).json({ message: "missing field favorite" });
    } else {
      res.status(200).json({ status: "success" });
    }
  } else {
    res.status(404).json({ message: "ID Not found" });
  }
};

module.exports = {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  favoriteContactController,
};
