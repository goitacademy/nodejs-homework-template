const Contacts = require('../model/contacts');
const { HttpCode } = require('../helpers/constants');

const listContacts = async (_req, res, next) => {
  try {
    const data = await Contacts.listContacts();
    return res
      .status(HttpCode.OK)
      .json({ status: 'success', code: HttpCode.OK, data });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    console.log(contact);
    if (contact) {
      return res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, contact });
    }
    return res
      .status(HttpCode.NOT_FOUND)
      .json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Not Found',
      });
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    return res
      .status(HttpCode.CREATED)
      .json({ status: 'success', code: HttpCode.CREATED, data: { contact } });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        message: 'contact deleted',
        contact,
      });
    }
    return res
      .status(HttpCode.NOT_FOUND)
      .json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Not Found',
      });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body,
    );
    if (contact) {
      return res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, data: { contact } });
    }
    return res
      .status(HttpCode.NOT_FOUND)
      .json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Not Found',
      });
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const contact = await Contacts.updateStatusContact(
      req.params.contactId,
      req.body,
    );

    if (contact) {
      return res
        .status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, data: { contact } });
    }
    return res
      .status(HttpCode.NOT_FOUND)
      .json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Not Found',
      });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
