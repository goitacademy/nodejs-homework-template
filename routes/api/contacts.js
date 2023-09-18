const express = require('express')
const router = express.Router()
const contactsModel = require('../../models/contacts')


router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsModel.listContacts()
    return res.json({
      status: "success",
      code: 200,
      data: { contacts },
    })
  } catch (err) {
    next(err)
  }
})

router.get('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId;

  try {
    const contact = await contactsModel.getContactById(contactId);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: { contact },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (err) {
    next(err);
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
