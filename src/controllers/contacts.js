const { HttpCode } = require("../helpers/constants");
const { ContactsService } = require("../services");
const contactsService = new ContactsService();

const listContacts = async (req, res, next) => {
  try {
    const contacts = await contactsService.listContacts();

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contact = await contactsService.getContactById(req.params.contactId);

    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        mesagge: "NOT FOUND",
        data: "NOT FOUND",
      });
    }
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contact = await contactsService.addContact(req.body);

    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const contact = await contactsService.removeContact(req.params.contactId);

    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        mesagge: "contact deleted",
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        mesagge: "NOT FOUND",
        data: "NOT FOUND",
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const contact = await contactsService.updateContact(
      req.params.contactId,
      req.body
    );

    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        mesagge: "NOT FOUND",
        data: "NOT FOUND",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
