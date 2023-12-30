const express = require('express')

const router = express.Router()


const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  // updateContact,
} = require('../../models/contacts.js');

router.get('/', async (req, res, next) => {
  const data = await listContacts();
  res.json({
    status: 'success',
    code: 200,
    message: 'contacts listed',
    data: data
  })
})

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const data = await getContactById(id);
  if (data === undefined) {
    res.json({
      status: 'error',
      code: 404,
      message: "Not found",
    })
  } else {
    res.json({
      status: 'success',
      code: 200,
      message: 'contact found',
      data: data
    })
  }
});

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (name === '' || email === '' || phone === '') {
    res.json({
      status: 'error',
      code: 400,
      message: "missing required fields"
    })
  } else {
    const data = await addContact(req.body);
      res.json({
        status: 'success',
        code: 201,
        message: 'contact created',
        data: data
      })
  };
});

router.delete('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const isDeleted = await removeContact(id);
  if (isDeleted === false) {
    res.json({
      status: 'error',
      code: 404,
      message: "Not found",
    })
  } else {
    res.json({
      status: 'success',
      code: 200,
      message: "contact deleted",
    })
  }
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
