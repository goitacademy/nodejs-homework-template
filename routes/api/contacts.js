const express = require('express')
const contactsOperations = require("../../models/contacts");
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    })
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    })
  }
  
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id=${contactId} not found`,
      });
      return;
    };
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      }
    })
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    })
  }
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
