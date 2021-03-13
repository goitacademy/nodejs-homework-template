const ContactsAPI = require("../model/contactsAPI.js");
const { HttpCode } = require("../helpers/constants");

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const allContacts = await ContactsAPI.getAll(userId, req.query);
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { ...allContacts },
    });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await ContactsAPI.getById(req.params.contactId, userId);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: contact,
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: "error",
        code: HttpCode.NOT_FOUND,
        data: "Not Found",
      });
    }
  } catch (err) {
    next(err);
  }
};

const addContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const newContact = await ContactsAPI.add({ ...req.body, owner: userId });
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: newContact,
    });
  } catch (err) {
    next(err);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const deletedContact = await ContactsAPI.remove(
      req.params.contactId,
      userId
    );
    if (deletedContact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: deletedContact,
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: "error",
        code: HttpCode.NOT_FOUND,
        data: "Not Found",
      });
    }
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const updatedContact = await ContactsAPI.update(
      req.params.contactId,
      req.body,
      userId
    );
    if (updatedContact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: updatedContact,
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: "error",
        code: HttpCode.NOT_FOUND,
        data: "Not Found",
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  addContact,
  deleteContact,
  updateContact,
};
