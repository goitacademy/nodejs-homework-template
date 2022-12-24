// const ObjectId = require("mongodb").ObjectId;
const {
  getContactsList,
  contactById,
  addNewContact,
  deleteContact,
  contactUpdate,
  changeContact,
  updateStatusContact,
} = require("../services/contactsService");

const getContactsListController = async (req, res, next) => {
  const contactsList = await getContactsList();
  res.json({ message: contactsList });
};

const contactByIdController = async (req, res, next) => {
  const id = req.params.contactId;

  const contact = await contactById(id);

  res.json({ message: contact });
};

const addNewContactController = async (req, res, next) => {
  const {
    body: { name, email, phone, favorite },
  } = req;

  const contact = await addNewContact({ name, email, phone, favorite });

  res.status(201).json({ message: contact });
};
const deleteContactController = async (req, res, next) => {
  const id = req.params.contactId;

  const contactRemovedById = await deleteContact(id);

  res.json({ message: `contact ${contactRemovedById.name} deleted` });
};
const contactUpdateController = async (req, res, next) => {
  const {
    body: { name, email, phone, favorite },
  } = req;
  const id = req.params.contactId;

  const contactUpdated = await contactUpdate(id, {
    name,
    email,
    phone,
    favorite,
  });

  res.json({ message: contactUpdated });
};
const changeContactController = async (req, res, next) => {
  const {
    body: { name, email, phone, favorite },
  } = req;
  const id = req.params.contactId;
  const contactUpdated = await changeContact(id, {
    name,
    email,
    phone,
    favorite,
  });

  res.json({ message: contactUpdated });
};
const changeFavoriteContactController = async (req, res, next) => {
  const { body } = req;
  const id = req.params.contactId;
  const contactUpdated = await updateStatusContact(id, body);

  res.json({ message: contactUpdated });
};

module.exports = {
  getContactsListController,
  contactByIdController,
  addNewContactController,
  deleteContactController,
  contactUpdateController,
  changeContactController,
  changeFavoriteContactController,
};
