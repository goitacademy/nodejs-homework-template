const Contacts = require('../repository/contacts');

const CustomError = require('../helpers/customError');
const { HttpCode, ResponseStatus } = require('../config/constants');

const getContacts = async (req, res) => {
  const userId = req.user._id;
  const data = await Contacts.listContacts(userId, req.query);

  res.status(HttpCode.OK).json({
    status: ResponseStatus.SUCCESS,
    code: HttpCode.OK,
    data: { ...data },
  });
};

const getContact = async (req, res) => {
  const userId = req.user._id;
  const contact = await Contacts.getContactById(req.params.contactId, userId);

  if (contact) {
    return res.status(HttpCode.OK).json({
      status: ResponseStatus.SUCCESS,
      code: HttpCode.OK,
      data: { contact },
    });
  }

  throw new CustomError(HttpCode.NOT_FOUND, 'Not found');
};

const saveContact = async (req, res) => {
  const userId = req.user._id;
  const contact = await Contacts.addContact({ ...req.body, owner: userId });
  res.status(HttpCode.CREATED).json({
    status: ResponseStatus.SUCCESS,
    code: HttpCode.CREATED,
    data: { contact },
  });
};

const removeContact = async (req, res) => {
  const userId = req.user._id;
  const contact = await Contacts.removeContact(req.params.contactId, userId);

  if (contact) {
    return res.status(HttpCode.OK).json({
      status: ResponseStatus.SUCCESS,
      code: HttpCode.OK,
      message: 'Deleted',
      data: { contact },
    });
  }

  throw new CustomError(HttpCode.NOT_FOUND, 'Not found');
};

const updateContact = async (req, res) => {
  const userId = req.user._id;
  const contact = await Contacts.updateContact(
    req.params.contactId,
    req.body,
    userId,
  );

  if (contact) {
    return res.status(HttpCode.OK).json({
      status: ResponseStatus.SUCCESS,
      code: HttpCode.OK,
      data: { contact },
    });
  }
  throw new CustomError(HttpCode.NOT_FOUND, 'Not found');
};

const updateStatusFavoriteContact = async (req, res) => {
  const userId = req.user._id;
  const contact = await Contacts.updateContact(
    req.params.contactId,
    req.body,
    userId,
  );

  if (contact) {
    return res.status(HttpCode.OK).json({
      status: ResponseStatus.SUCCESS,
      code: HttpCode.OK,
      data: { contact },
    });
  }

  throw new CustomError(HttpCode.NOT_FOUND, 'Not found');
};

module.exports = {
  getContacts,
  getContact,
  removeContact,
  saveContact,
  updateContact,
  updateStatusFavoriteContact,
};
