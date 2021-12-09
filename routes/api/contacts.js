const express = require('express')
const router = express.Router()

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("../../controllers/contacts");

router.get('/', async (req, res, next) => {
 try { const contacts = await listContacts()
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts
    }
  })
 
 } catch (error) {
   next(error)
 }
})

router.get('/:contactId', async (req, res, next) => {

  try { 
    console.log(req.params)
    const {contactId} = req.params
    const result = await getContactById(contactId)

    if (!result) {
      const error = new Error (`contact with ${contactId} not found`)
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
    })
   
   } catch (error) {
        next(error)
   }
  })


router.post('/', async (req, res, next) => {
  const result = await addContact(req.body)

  res.json({  
  status: "success",
  code: 201,
  data: {
    result
  }
})
})


router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
