/* eslint-disable linebreak-style */
const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../services.js/contactsServices');

const getContactsController = async (req, res, next) => {
  try {
    const result = await getContacts();
    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        contacts: result,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getContactByIdController = async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await getContactById(contactId);

    if (result) {
      res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          contact: result,
        },
      });
    } else {
      res.status(404).json({
        status: 'fail',
        code: 404,
        message: `Not found contact with id: ${contactId}`,
        data: 'Not found',
      },
      );
    };
  } catch (error) {
    console.error(error);
    next(error);
  };
};

const addContactController = async (req, res, next) => {
  try {
    const {body} = req;
    const result = await addContact(body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        newContact: result,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  };
};

const removeContactController = async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await removeContact(contactId);
    if (result) {
      res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          deleted: result,
        },
      });
    } else {
      res.status(404).json({
        status: 'fail',
        code: 404,
        message: `Not found contact with id: ${contactId}`,
        data: 'Not found',
      },
      );
    };
  } catch (error) {
    console.error(error);
    next(error);
  };
};

const updateContactController = async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const {body} = req;
    const result = await updateContact(contactId, body);
    if (result) {
      res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          updated: result,
        },
      });
    } else {
      res.status(404).json({
        status: 'fail',
        code: 404,
        message: `Not found contact with id: ${contactId}`,
        data: 'Not found',
      },
      );
    };
  } catch (error) {
    console.error(error);
    next(error);
  };
};

const updateContactStatusController = async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const {favorite} = req.body;

    const result = await updateContact(contactId, {favorite});
    if (result) {
      res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          updated: result,
        },
      });
    } else {
      res.status(404).json({
        status: 'fail',
        code: 404,
        message: `Not found contact with id: ${contactId}`,
        data: 'Not found',
      },
      );
    };
  } catch (error) {
    console.error(error);
    next(error);
  };
};

module.exports = {
  getContactByIdController,
  getContactsController,
  removeContactController,
  addContactController,
  updateContactController,
  updateContactStatusController,
};
