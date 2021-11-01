const Contacts = require("../repository/contacts");
const CustomError = require("../helpers/customError");
const { HttpCode } = require("../config/constants");

const getContacts = async (req, res, next) => {
  // console.log(req.method);
  console.log(req.query);

  const userId = req.user._id;
  const data = await Contacts.listContacts(userId, req.query);
  res
    .status(HttpCode.OK)
    .json({ status: "success", cod: HttpCode.OK, data: { ...data } });
};

const getContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.getContactById(req.params.contactId, userId);
  // console.log(req.params);
  // console.log(contact);
  // console.log(contact.id);

  if (contact && contact !== null) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", cod: HttpCode.OK, data: { contact } });
  }
  throw new CustomError(HttpCode.NOT_FOUND, "Not found");
};

const createContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.addContact({ ...req.body, owner: userId });
  res
    .status(HttpCode.CREATED)
    .json({ status: "success", cod: HttpCode.CREATED, data: { contact } });
};

const deleteContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.removeContact(req.params.contactId, userId);
  if (contact) {
    return res.status(HttpCode.OK).json({
      status: "success",
      cod: HttpCode.OK,
      message: "contact deleted",
      data: { contact },
    });
  }
  throw new CustomError(HttpCode.NOT_FOUND, " Not found");
};

const updateContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.updateContact(
    req.params.contactId,
    req.body,
    userId
  );
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", cod: HttpCode.OK, data: { contact } });
  }

  throw new CustomError(HttpCode.NOT_FOUND, " Not found");
};

const updateStatusFavoriteContact = async (req, res, next) => {
  const { favorite } = req.body;
  const userId = req.user._id;
  const contact = await Contacts.updateContact(
    req.params.contactId,
    { favorite },
    userId
  );
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", cod: HttpCode.OK, data: { contact } });
  }
  throw new CustomError(HttpCode.NOT_FOUND, "Not Found");
};
module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusFavoriteContact,
};
