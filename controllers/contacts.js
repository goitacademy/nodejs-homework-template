const Contacts = require('../repository/contact');

const getContacts = async (_req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    res.json({ status: 'success', code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);

    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } });
    }

    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

const saveContact = async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    res.status(201).json({ status: 'success', code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);

    if (contact) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Deleted',
        data: { contact },
      });
    }

    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
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
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } });
    }

    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

const updateStatusFavoriteContact = async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body,
    );

    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } });
    }

    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContact,
  removeContact,
  saveContact,
  updateContact,
  updateStatusFavoriteContact,
};
