const express = require('express')
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts(contacts);
    res.json({status: 'success', code: 200 });
  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (contact) {
      return res.status(200).json({ status: 'success', code: 200 });
    }
    return res.status(404).json({ status: 'error', code: 404, message: 'Not found' });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'missing required name - field' });
    }
    const newContact = await addContact({ name, email, phone });
    return res.status(201).json({ status: 'success', code: 201 });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId)
    if (contact) {
      return res.status(200).json({ status: 'succes', code: 200, message: 'contact deleted' })
    }
    return res.status(404).json({ status: 'error', code: 404, message: 'Not found' })
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
 try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'missing fields' });
    }
    const updatedContact = await updateContact(contactId, { name, email, phone });

    if (updatedContact) {
      return res.status(200).json({ status: 'success', code: 200 });
    } else {
      return res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router
