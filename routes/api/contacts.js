const express = require('express')
const contacts = require('../../models/contacts')
const router = express.Router()
const HttpError = require('../../helpers/HttpError')
router.get('/', async (req, res, next) => {
 try {
   const result = await contacts.listContacts();
   res.json(result);
 } catch (error) {
     const { status = 500, message = "Server error" } = error;
     res.status(status).json({ message });
 }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
     const result = await contacts.getContactById(contactId);
     if(!result) {
      throw HttpError(404, 'Not Found')
     }
     res.json(result)
  } catch (error) {
    const {status = 500, message= "Server error" } = error
    res.status(status).json({ message});
  }
})

router.post('/', async (req, res, next) => {
  res.json({ message: "home message" });
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: "home message" });
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
