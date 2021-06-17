const Contacts = require('../repositories/contacts');

const getAllContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contactsList = await Contacts.listContacts(userId, req.query);
    return res.json({ status: 'success', code: 200, data: { contactsList } })
  } catch (e) {
    next(e);
  };
};

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.getContactById(userId, req.params.contactId);
    if (contact) {
      return res.json({ status: 'success', code: 200, data: { contact } })
    };
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (e) {
    next(e)
  };
};

const addContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.addContact(userId, req.body);
    return res
      .status(201)
      .json({ status: 'success', code: 201, data: { contact } })
  } catch (e) {
    if (e.name === 'ValidationError') {
      e.status = 400;
    }
    next(e);
  };
};

const removeContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.removeContact(userId, req.params.contactId);
    if (contact) {
      return res.json({ status: 'success', code: 200, data: { contact } })
    };
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (e) {
    next(e)
  };
};

const updateContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.updateContact(userId, req.params.contactId, req.body);
    if (contact) {
      return res.json({ status: 'success', code: 200, data: { contact } })
    };
    return res.json({ status: 'error', code: 404, message: 'Not found' })
  } catch (e) {
    next(e)
  };
};

const updateStatusContact = async (req, res, next) => {
  try {
    if (!req.body?.favorite) {
      return res.json({ status: 'error', code: 400, message: 'missing field favorite' })
    };
    const userId = req.user.id;
    const contact = await Contacts.updateStatusContact(userId, req.params.contactId, req.body);
    if (contact) {
      return res.json({ status: 'success', code: 200, data: { contact } })
    }
    return res.json({ status: 'error', code: 404, message: 'Not found' });
  } catch (e) {
    next(e);
  };
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};