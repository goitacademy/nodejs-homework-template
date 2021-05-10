const express = require('express');
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require('../../model/index');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.status(200).json({
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

router.get('/:contactId', async (req, res, next) => {
  try {
    const contactWithId = await getContactById(req.params.contactId);
    if (contactWithId) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contactWithId } });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    return res
      .status(201)
      .json({ status: 'success', code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
});

router.patch('/:contactId', async (req, res, next) => {
  try {
    const contactWithId = await updateContact(req.params.contactId, req.body);
    if (contactWithId) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contactWithId } });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contactWithId = await removeContact(req.params.contactId);
    if (contactWithId) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contactWithId } });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not found' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
