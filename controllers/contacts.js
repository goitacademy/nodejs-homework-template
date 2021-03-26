const Contact = require('../model/contacts');
const { HttpCode } = require('../helpers/constants');

const getAllContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contact.listContacts(userId, req.query);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          ...contact,
        },
      });
    } else {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: 'Contact list is empty',
      });
    }
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contact.getContactById(req.params.contactId, userId);
    if (contact) {
      return res.status(HttpCode.OK).json({
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
        data: 'User with this ID was not found!',
      });
    }
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user.id;
  if (name && email) {
    const contact = await Contact.addContact({ ...req.body, owner: userId });
    if (contact) {
      return res.status(HttpCode.CREATED).json({
        status: 'success',
        code: HttpCode.CREATED,
        data: { contact },
      });
    } else {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: 'error',
        code: HttpCode.BAD_REQUEST,
        data: 'A user with this name or email already exists!',
      });
    }
  } else {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'Missing required name field',
    });
  }
};

const removeContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contact.removeContact(req.params.contactId, userId);

    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        message: 'Contact deleted',
      });
    } else {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: 'error',
        code: HttpCode.BAD_REQUEST,
        message: 'Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (req.body) {
      const contact = await Contact.updateContact(
        req.params.contactId,
        req.body,
        userId,
      );

      if (contact) {
        return res.status(HttpCode.OK).json({
          status: 'success',
          code: HttpCode.OK,
          message: 'Contact updated successfully',
          data: {
            contact,
          },
        });
      } else {
        return res.status(HttpCode.NOT_FOUND).json({
          status: 'error',
          code: HttpCode.NOT_FOUND,
          message: 'Not found',
          // data: 'User with this ID was not found!',
        });
      }
    } else {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: 'error',
        code: HttpCode.BAD_REQUEST,
        message: 'Missing fields',
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllContact,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
