const Contacts = require('../model/index');
const getAllContact = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const contacts = await Contacts.listContacts(userId);
    return res.json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const contact = await Contacts.getContactById(userId, req.params.contactId);
    if (contact) {
      return res.json({
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        message: 'Not found',
      });
    }
  } catch (e) {
    next(e);
  }
};

const createContact = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const contact = await Contacts.addContact(userId, req.body);
    return res.status(201).json({
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const contact = await Contacts.removeContact(userId, req.params.contactId);
    if (contact) {
      return res.json({
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        message: 'Not found',
      });
    }
  } catch (e) {
    next(e);
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
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        message: 'Not found',
      });
    }
  } catch (e) {
    next(e);
  }
};
const updateStatusContact = async (req, res, next) => {
  try {
    console.log(req.body);
    if (req.body.favorite === undefined) {
      return res.status(400).json({
        message: 'missing field favorite',
      });
    }
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body
    );

    if (contact) {
      return res.json({
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        message: 'Not found',
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllContact,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
