const express = require('express')

const router = express.Router();

const { listContacts, getContactById, addContact } = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.json({
    status: 'success',
    code: 200,
    data: {
      contacts,
    },
  });
  next();
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (contact) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact },
      });
      return;
    }
    res.status(404).json({
      status: "Not found",
      code: 404,
    })
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = await req.body;
    const contact = await addContact({ name, email, phone });
    res.status(201).json({
      status: "success",
      code: 201,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (contact) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact },
      });
      return;
    }
    res.status(404).json({
      status: "Not found",
      code: 404,
    })
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
