const Contacts = require('../model/contacs');
const { HttpCode } = require('../helpers/contactsHelpers');

const controllerGetAllContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await Contacts.listContacts(userId, req.query);
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { ...contacts },
    });
  } catch (e) {
    next(e);
  }
};

const controllerGetContactById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.getContactById(userId, req.params.contactId);
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
    const userId = req.user.id;
    const contact = await Contacts.addContact({ ...req.body, owner: userId });
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
    const userId = req.user.id;
    const contact = await Contacts.removeContact(userId, req.params.contactId);
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
    const userId = req.user.id;
    const contact = await Contacts.updateContact(
      userId,
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
