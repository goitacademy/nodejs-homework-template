const express = require('express')
const router = express.Router()
const {listContacts, getContactById} = require('../../model/index')

router.get('/', async (_req, res, next) => {
  try {
    const contacts = await listContacts();
     res.json({
      status: "Success",
      code: 200,
      data:{contacts},
    });
  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
   // const id = req.params.contactId
   // const contact = await getContactById(id)
   const { contactId } = req.params
   const contact = await getContactById(contactId)
    if (!contact) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      }) 
    }else
     {res.status(200).json({
      message: 'success',
      status: 200,
      data: { result: contact },
    })
        
  }} catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  if (error) {
    res.status(400).json({
      message: 'missing required name field',
      status: 400,
    })
  } else {
    const newContact = await addContact(req.query)
    res.status(201).json({
      message: 'success',
      status: 201,
      contact: ('new contact', newContact),
    })
  }
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template m' })
})

module.exports = router
