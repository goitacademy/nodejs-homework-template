const { HttpCode } = require("../helpers/constants");
const { ContactsService } = require("../services");
const contactsService = new ContactsService();

const listContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await contactsService.listContacts(userId, req.query);

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        ...contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactsService.getContactById(
      userId,
      req.params.contactId
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

const addContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactsService.addContact(userId, req.body);

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
    const userId = req.user.id;
    const contact = await contactsService.removeContact(
      userId,
      req.params.contactId
    );

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
    const userId = req.user.id;
    const contact = await contactsService.updateContact(
      userId,
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

const updateStatusContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactsService.updateStatusContact(
      userId,
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
  updateStatusContact,
};
