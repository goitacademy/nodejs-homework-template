const Contacts = require('../repository/contacts');
const { CustomError } = require('../helpers/customError');

const getContactsList = async (req, res) => {
  const userId = req.user._id;
  const data = await Contacts.listContacts(userId, req.query);
  res.json({
    status: 'success',
    code: 200,
    data: {
      ...data,
    },
  });
};

const getContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.getContactById(req.params.contactId, userId);

  if (contact) {
    return res
      .status(200)
      .json({ status: 'success', code: 200, data: { contact } });
  }
  throw new CustomError(404, 'Not Found');
};

const createContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.addContact({ ...req.body, owner: userId });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      contact,
    },
  });
};

const removeContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.removeContact(req.params.contactId, userId);

  if (!contact) {
    throw new CustomError(404, 'Not Found');
  }

  return res
    .status(200)
    .json({ status: 'success', code: 200, data: { contact } });
};

const updateContact = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.updateContact(
    req.params.contactId,
    req.body,
    userId,
  );

  if (!contact) {
    throw new CustomError(404, 'Not Found');
  }

  return res
    .status(200)
    .json({ status: 'success', code: 200, data: { contact } });
};

const updateStatusFavorite = async (req, res, next) => {
  const userId = req.user._id;
  const contact = await Contacts.updateContact(
    req.params.contactId,
    req.body,
    userId,
  );

  if (!contact) {
    throw new CustomError(404, 'Not Found');
  }

  return res
    .status(200)
    .json({ status: 'success', code: 200, data: { contact } });
};

module.exports = {
  getContactsList,
  getContact,
  createContact,
  removeContact,
  updateContact,
  updateStatusFavorite,
};
