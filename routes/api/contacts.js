const express = require('express');

const contactsOperations = require("../../model/contacts");


const router = express.Router();



router.get('/', async (req, res, next) => {
  try {
    console.log(contactsOperations);
    const contacts = await contactsOperations.getContactsList();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    })
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const contact = await contactsOperations.getContactById(id);
    if (!contact) {
      res.status(404).json({
        message: "Server Error"
      })
      res.json(contact)

    } catch (error) {
      res.status(500).json({
        message: "Server Error"
      })
    }
  })

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router;



