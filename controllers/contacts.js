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
  try {
    const contacts = await getAllContactsService(req.query);
    res.json(contacts);
  } catch (err) {
    next(err);
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await getContactByIdService(contactId);
    if (!contact) {
      throw new HttpError(
        404,
        `Contact with id - "${contactId}", not found!!!`
      );
    }
    res.json({
      status: "success",
      code: 200,
      data: { contact },
    });
  } catch (err) {
    next(err);
  }
};

const addContact = async (req, res, next) => {
  try {
    const newContact = await addContactService(req.user._id, req.body);
    res.json({ status: "success", code: 201, data: { contact: newContact } });
  } catch (err) {
    next(err);
  }
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const isDeleted = await removeContactService(contactId);
    if (!isDeleted) {
      throw new HttpError(
        404,
        `Contact with id - "${contactId}", not found!!!`
      );
    }

    res
      .status(200)
      .json({ status: "success", code: 200, message: "contact deleted" });
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const isUpdate = await updateContactService(contactId, req.body);
    if (!isUpdate) {
      throw new HttpError(
        404,
        `Contact with id - "${contactId}", not found!!!`
      );
    }

    res.status(200).json({ status: "success", code: 200, data: isUpdate });
  } catch (err) {
    next(err);
  }
};

const updateContactFavorite = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const isUpdate = await updateContactFavoriteService(contactId, req.body);
    if (!isUpdate) {
      throw new HttpError(
        404,
        `Contact with id - "${contactId}", not found!!!`
      );
    }

    res.status(200).json({ status: "success", code: 200, data: isUpdate });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllContacts: conrollerWraper(getAllContacts),
  getContactById: conrollerWraper(getContactById),
  addContact: conrollerWraper(addContact),
  removeContact: conrollerWraper(removeContact),
  updateContact: conrollerWraper(updateContact),
  updateContactFavorite: conrollerWraper(updateContactFavorite),
};
