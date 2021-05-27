const Contacts = require('../model/contacts');

const { HttpCode } = require('../helpers/constants');

const getAll = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { contacts, total, limit, page, offset } =
      await Contacts.listContacts(userId, req.query);
    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        contacts,
        total,
        limit,
        page,
        offset,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const contact = await Contacts.getContactById(userId, req.params.contactId);
    if (contact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Not found',
      });
    }
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const contact = await Contacts.addContact(userId, req.body);
    if (contact) {
      return res.status(HttpCode.CREATED).json({
        status: ' success',
        code: HttpCode.CREATED,
        data: {
          contact,
        },
      });
    } else {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: 'error',
        code: HttpCode.BAD_REQUEST,
        message: 'missing required name field',
      });
    }
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const contact = await Contacts.removeContact(userId, req.params.contactId);
    if (contact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        data: 'Not found',
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const contact = await Contacts.updateContact(
      userId,
      req.params.contactId,
      req.body
    );
    if (contact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Not found',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  createContact,
  removeContact,
  updateContact,
};
