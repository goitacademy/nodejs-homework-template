const Contact = require('../../model/contact.model');
const HTTP_STATUS = require('../../utils/httpStatusCodes');
const { addContactSchema, updateContactSchema } = require('../../utils/validate/schemas');

const listContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.status(HTTP_STATUS.SUCCESS).json(result);
  } catch (error) {
    error.message = 'Error: cannot read contacts file';
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await Contact.findById(contactId);

    if (!result) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'id not found' });
    }

    res.status(HTTP_STATUS.SUCCESS).json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  const { body } = req;

  const { error } = addContactSchema.validate(body);

  if (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
  }

  try {
    const result = await Contact.create(body);
    res.status(HTTP_STATUS.CREATED).json(result);
  } catch (error) {
    error.code = HTTP_STATUS.BAD_REQUEST;
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  const { error } = updateContactSchema.validate(body);
  if (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
  }
  try {
    const result = await Contact.findByIdAndUpdate(contactId, body, { new: true });
    res.status(HTTP_STATUS.SUCCESS).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    await Contact.findByIdAndDelete(contactId);
    res.status(HTTP_STATUS.DELETED).json({ id: contactId });
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { body } = req;
  const { contactId } = req.params;

  if (!body.hasOwnProperty('favorite')) {
    return res.status(400).json({ message: 'missing field favorite' });
  }

  try {
    const result = await Contact.findByIdAndUpdate(contactId, body, { new: true });
    res.status(HTTP_STATUS.SUCCESS).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  deleteContactById,
  updateStatusContact,
};