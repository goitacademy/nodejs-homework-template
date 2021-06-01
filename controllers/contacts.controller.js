const fn = require("../model/contacts.model");
const { HttpCode } = require("../helpers/constants");

const getContacts = async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const contactsList = await fn.listContacts(userId, req.query);

    if (contactsList) {
      const { contacts, page, offset, limit, total } = contactsList;
      return res.status(200).json({
        status: "success",
        code: HttpCode.OK,
        data: { page, total, limit, offset, contacts },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: HttpCode.NOT_FOUND,
        message: "error",
      });
    }
  } catch (e) {
    next(e.message);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const contact = await fn.getContactById(req.params.contactId, userId);

    if (contact) {
      res.status(200).json({
        status: "success",
        code: HttpCode.OK,
        data: contact,
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: HttpCode.NOT_FOUND,
        message: "Not found",
      });
    }
  } catch (e) {
    next(e.message);
  }
};

const createContact = async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const newContact = await fn.addContact({ ...req.body, owner: userId });

    if (newContact) {
      res.status(201).json({
        status: "success",
        code: HttpCode.CREATED,
        data: newContact,
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: HttpCode.NOT_FOUND,
        message: "contact was not deleted",
      });
    }
  } catch (e) {
    next(e.message);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const deletedContact = await fn.removeContact(req.params.contactId, userId);

    if (deletedContact) {
      return res.status(200).json({
        status: "success",
        code: HttpCode.OK,
        message: "contact deleted",
        data: deletedContact,
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: HttpCode.NOT_FOUND,
        message: "contact was not deleted",
      });
    }
  } catch (e) {
    next(e);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const contact = await fn.updateContact(
      req.params.contactId,
      req.body,
      userId
    );

    if (contact) {
      return res.status(200).json({
        status: "success",
        code: HttpCode.OK,
        data: contact,
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: HttpCode.NOT_FOUND,
        message: "contact was not deleted",
      });
    }
  } catch (e) {
    next(e.message);
  }
};

const updateFavoriteStatus = async (req, res, next) => {
  try {
    const userId = res.locals.user.id;

    if (req.body && userId) {
      const contact = await fn.updateStatusContact(
        req.params.contactId,
        req.body,
        userId
      );
      return res.status(200).json({
        status: "success",
        code: HttpCode.OK,
        data: contact,
      });
    } else {
      return next(
        res.status(400).json({
          status: "error",
          code: HttpCode.BAD_REQUEST,
          message: "missing field favorite",
        })
      );
    }
  } catch {
    res.status(404).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "not found",
    });
  }
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
  updateFavoriteStatus,
};
