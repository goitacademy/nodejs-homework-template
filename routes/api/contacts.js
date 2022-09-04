const express = require('express');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact
} = require('../../models/contacts');

const { getContactValidationMiddleware } = require('../../middleware/contactsValidationMiddlware');

const router = express.Router();

router.get('/', async (_, res) => {
  try {
    const contacts = await listContacts();

    res
      .status(200)
      .json({ data: contacts });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error });
  }
})

router.get('/:contactId', async (req, res) => {
  try {
    const { contactId } = req.params;
    const found = await getContactById(contactId);

    if(!found) return res.status(404).json({ message: 'Not found' });

    res
      .status(200)
      .json({ data: found });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error });
  }
})

router.post('/', getContactValidationMiddleware(), async (req, res) => {
  try {
    const added = await addContact(req.body);

    res
      .status(201)
      .json({ data: added });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message });
  }
})

router.delete('/:contactId', async (req, res) => {
  try {
    const { contactId } = req.params;
    const removed = await removeContact(contactId);

    if(!removed) return res.status(404).json({ message: 'Not found' });

    res
      .status(200)
      .json({ message: 'contact deleted', data: removed });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message });
  }
})

router.put('/:contactId', getContactValidationMiddleware(), async (req, res) => {
  try {
    const { contactId } = req.params;
    const updated = await updateContact(contactId, req.body);

    if(!updated) return res.status(404).json({ message: 'Not found' });

    res
      .status(200)
      .json({ data: updated })
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message })
  }
})

module.exports = router;
