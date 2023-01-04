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
  const {
    user: { _id: owner },
  } = req;
  const { page = 1, limit = 20, favorite = null } = req.query;
  const skip = (page - 1) * limit;
  // console.log("favorite", favorite);
  const params = favorite ? { owner, favorite } : { owner };
  const contactsList = await getContactsList(params, { skip, limit, favorite });
  res.json({ message: contactsList });
};

const contactByIdController = async (req, res, next) => {
  const {
    user: { _id: owner },
  } = req;
  const id = req.params.contactId;

  const contact = await contactById(id, owner);

  res.json({ message: contact });
};

const addNewContactController = async (req, res, next) => {
  const {
    user,
    body: { name, email, phone, favorite },
  } = req;
  const { _id: owner } = user;
  const contact = await addNewContact({ name, email, phone, favorite, owner });

  res.status(201).json({ message: contact });
};
const deleteContactController = async (req, res, next) => {
  const id = req.params.contactId;
  const {
    user: { _id: owner },
  } = req;
  const contactRemovedById = await deleteContact(id, owner);

  res.json({ message: `contact ${contactRemovedById.name} deleted` });
};
const contactUpdateController = async (req, res, next) => {
  const {
    user: { _id: owner },
    body: { name, email, phone, favorite },
  } = req;
  const id = req.params.contactId;

  const contactUpdated = await contactUpdate(id, {
    name,
    email,
    phone,
    favorite,
    owner,
  });

  res.json({ message: contactUpdated });
};
const changeContactController = async (req, res, next) => {
  const {
    user: { _id: owner },
    body: { name, email, phone, favorite },
  } = req;
  const id = req.params.contactId;
  const contactUpdated = await changeContact(id, {
    name,
    email,
    phone,
    favorite,
    owner,
  });

  res.json({ message: contactUpdated });
};
const changeFavoriteContactController = async (req, res, next) => {
  const {
    body,
    user: { _id: owner },
  } = req;
  const id = req.params.contactId;
  const contactUpdated = await updateStatusContact(id, { ...body, owner });

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
