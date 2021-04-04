const { HttpCode } = require("../helpers/constants");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../model/contactsServises.js");

const getAllContactsControler = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: "success",
      code: HttpCode.OK,
      contacts,
    });
  } catch (error) {
    next(error);
  }
};

const getContactByIdControler = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (contact) {
      return res.json({
        status: "success",
        code: HttpCode.OK,
        contact,
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found contact",
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const createContactControler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await addContact(req.body, userId);
    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      contact,
    });
  } catch (error) {
    next(error);
  }
};

const removeContactControler = async (req, res, next) => {
  try {
    const data = await removeContact(req.params.contactId);
    if (data) {
      return res.json({
        status: HttpCode.OK,
        message: "contact deleted",
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found contact",
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateContactControler = async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body);
    if (contact) {
      return res.json({
        status: "success",
        code: HttpCode.OK,
        contact,
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found contact",
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContactsControler,
  getContactByIdControler,
  createContactControler,
  removeContactControler,
  updateContactControler,
};
