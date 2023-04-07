const express = require('express')

const router = express.Router()

const contactsOperations = require('../../models/contacts')


router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error"
    })
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsOperations.getContactById(id);
    if (!contact) {
      res.status(404).json({
        status: "error",
        code: 404,
        data: {
          message: "Not found" 
        }
      })
      return;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contact
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error"
    })
  }
});



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
