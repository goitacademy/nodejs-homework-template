const express = require('express')


const {listContacts, getContactById, removeContact, addContact, updateContact} = require('../../models/contacts');

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({
      contacts,
    });
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    })
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    res.status(200).json({
      contact,
    });
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    })
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const contacts = await addContact(name, email, phone);
    res.status(201).json({
      contacts,
    });
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    })
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    removeContact(contactId);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    })
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const contact = await updateContact(contactId, name, email, phone);

    res.status(200).json({
      contact,
    });
  } catch (err) {
    res.status(500).json({
      msg: err.msg,
    })
  }
});

module.exports = router
