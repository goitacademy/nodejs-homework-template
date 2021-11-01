const Contacts = require('../repository/contacts');

const getContacts = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const data = await Contacts.listContacts(userId, req.query);

    res.json({ status: 'success', code: 200, data: { ...data } });
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contact = await Contacts.getContactById(req.params.contactId, userId);

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
    const userId = req.user._id;
    const contact = await Contacts.addContact({ ...req.body, owner: userId });
    res.status(201).json({ status: 'success', code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contact = await Contacts.removeContact(req.params.contactId, userId);

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
    const userId = req.user._id;
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body,
      userId,
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
    const userId = req.user._id;
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body,
      userId,
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
