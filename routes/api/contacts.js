const express = require('express');
const router = express.Router();
const Contacts = require('../../model');
const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
  validationObjectId,
} = require('./valid-contact-router');

const handleError = require('../../helper/handle-error');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();

    return res.json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', validationObjectId, async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (contact) {
      return res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validationCreateContact,
  handleError(async (req, res, next) => {
    const contact = await Contacts.addContact(req.body);
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        contact,
      },
    });
  }),
);

router.delete('/:contactId', validationObjectId, async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (contact) {
      return res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:contactId',
  validationObjectId,
  validationUpdateContact,
  async (req, res, next) => {
    try {
      const contact = await Contacts.updateContact(
        req.params.contactId,
        req.body,
      );

      if (contact) {
        return res.status(201).json({
          status: 'success',
          code: 201,
          data: {
            contact,
          },
        });
      } else {
        return res.status(404).json({
          status: 'error',
          code: 404,
          data: 'Not Found',
        });
      }
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:contactId/favorite',
  validationObjectId,
  validationUpdateStatusContact,
  async (req, res, next) => {
    try {
      const contact = await Contacts.updateStatusContact(
        req.params.contactId,
        req.body,
      );

      if (contact) {
        return res.status(201).json({
          status: 'success',
          code: 201,
          data: {
            contact,
          },
        });
      } else {
        return res.status(404).json({
          status: 'error',
          code: 404,
          data: 'Not Found',
        });
      }
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
