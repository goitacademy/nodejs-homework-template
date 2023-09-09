const {
  getAllContactsService,
  getContactByIdService,
  addContactService,
  removeContactService,
  updateContactService,
  updateContactFavoriteService,
} = require("../secrive/contactsServices");
const { conrollerWraper } = require("../helpers/controllerWraper");
const { HttpError } = require("../helpers/HttpError");

const getAllContacts = async (req, res) => {
  const contacts = await getAllContactsService(req.query);
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactByIdService(contactId);
  if (!contact) {
    throw new HttpError(404, `Contact with id - "${contactId}", not found!!!`);
  }
  res.json({
    status: "success",
    code: 200,
    data: { contact },
  });
};

const addContact = async (req, res) => {
  const newContact = await addContactService(req.user._id, req.body);
  res.json({ status: "success", code: 201, data: { contact: newContact } });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const isDeleted = await removeContactService(contactId);
  if (!isDeleted) {
    throw new HttpError(404, `Contact with id - "${contactId}", not found!!!`);
  }

  res
    .status(200)
    .json({ status: "success", code: 200, message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const isUpdate = await updateContactService(contactId, req.body);
  if (!isUpdate) {
    throw new HttpError(404, `Contact with id - "${contactId}", not found!!!`);
  }

  res.status(200).json({ status: "success", code: 200, data: isUpdate });
};

const updateContactFavorite = async (req, res) => {
  const { contactId } = req.params;
  const isUpdate = await updateContactFavoriteService(contactId, req.body);
  if (!isUpdate) {
    throw new HttpError(404, `Contact with id - "${contactId}", not found!!!`);
  }

  res.status(200).json({ status: "success", code: 200, data: isUpdate });
};

module.exports = {
  getAllContacts: conrollerWraper(getAllContacts),
  getContactById: conrollerWraper(getContactById),
  addContact: conrollerWraper(addContact),
  removeContact: conrollerWraper(removeContact),
  updateContact: conrollerWraper(updateContact),
  updateContactFavorite: conrollerWraper(updateContactFavorite),
};
