const Contacts = require("../repository/contacts");
const { StatusCode } = require("../config/constants");
const { CustomError } = require("../helpers/customError");


const OK = StatusCode.OK;
const NOT_FOUND = StatusCode.NOT_FOUND;
const CREATED = StatusCode.CREATED;


const getContacts = async (req, res) => {
  const userId = req.user._id;
  const data = await Contacts.listContacts(userId, req.query);
  res.json({
    status: "success",
    code: OK,
    message: "A requested list of contacts found!",
    data: { ...data },
  });
};

const getContactById = async (req, res) => {
  const userId = req.user._id;
  const contact = await Contacts.getContactById(req.params.contactId, userId);
  if (contact) {
    return res.status(OK).json({
      status: "success",
      code: OK,
      message: `Contact with id ${req.params.contactId} found!`,
      data: { contact },
    });
  }
  throw new CustomError(NOT_FOUND, "Not Found!");
};

const addContact = async (req, res) => {
  const userId = req.user._id;
  const contact = await Contacts.addContact({ ...req.body, owner: userId });
  res.status(CREATED).json({
    status: "success",
    code: CREATED,
    message: `Contact with name ${req.body.name} created successfully!`,
    data: { contact },
  });
};

const removeContact = async (req, res) => {
  const userId = req.user._id;
  const contact = await Contacts.removeContact(req.params.contactId, userId);
  if (contact) {
    return res.status(OK).json({
      status: "success",
      code: OK,
      message: `Contact with id ${req.params.contactId} deleted!`,
      data: { contact },
    });
  }
  throw new CustomError(NOT_FOUND, "Not Found!");
};

const updateContact = async (req, res) => {
  const userId = req.user._id;
  const contact = await Contacts.updateContact(
    req.params.contactId,
    req.body,
    userId
  );
  if (contact) {
    return res.status(OK).json({
      status: "success",
      code: OK,
      message: `Contact with id ${req.params.contactId} successfully updated!`,
      data: { contact },
    });
  }
  throw new CustomError(NOT_FOUND, "Not Found!");
};

const updateFavoriteContactStatus = async (req, res) => {
  const userId = req.user._id;
  const contact = await Contacts.updateContact(
    req.params.contactId,
    req.body,
    userId
  );
  if (contact) {
    return res.status(OK).json({
      status: "success",
      code: OK,
      message: `Field favorite for contact with id ${req.params.contactId} successfully updated!`,
      data: { contact },
    });
  }
  throw new CustomError(NOT_FOUND, "Not Found!");
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavoriteContactStatus,
};