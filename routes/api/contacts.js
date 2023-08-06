const express = require('express')

const router = express.Router();

const { listContacts, getContactById, addContact, updateContact, removeContact } = require('../../models/contacts');
// const contacts = listContacts();

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
    const contact = await removeContact(contactId);
    if (contact) {
      res.json({
        status: "success",
        code: 200,
        // data: { contact },
      });
      // return;
    } else { 
      res.status(404).json({
        status: "Not found",
        code: 404,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    // const { name, email, phone } = req.body;
    const isContact = await updateContact(contactId);
      // JSON.parse(JSON.stringify(validation.value)
    if (isContact) {
      res.json({
        status: "success",
        code: 200,
        data: { ...isContact },
      });
      return;
    }
    res.status(404).json({
      message: "Not found",
      code: 404,
    });
  } catch (error) {
    next(error);
  }
})

module.exports = router
