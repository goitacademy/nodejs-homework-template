const Contacts = require('../model/index');
const { HttpCode } = require('../helpers/contactsHelpers');

const controllerGetAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contacts },
    });
  } catch (e) {
    next(e);
  }
};

const controllerGetContactById = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (contact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: { contact },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found',
      });
    }
  } catch (e) {
    next(e);
  }
};

const controllerCreateContact = async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: { contact },
    });
  } catch (e) {
    next(e);
  }
};

const controllerDeleteContact = async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (contact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: { contact },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found',
      });
    }
  } catch (e) {
    next(e);
  }
};

const controllerUpdateContact = async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body,
    );
    if (contact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: { contact },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found',
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  controllerGetAllContacts,
  controllerGetContactById,
  controllerCreateContact,
  controllerDeleteContact,
  controllerUpdateContact,
};
