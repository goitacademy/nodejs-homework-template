const express = require('express')

const Joi = require('joi')

const router = express.Router()

const {
  listContacts, 
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts')

const schema = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string().min(3).max(25)
})

// =======================GET==============================

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.json({ 
      status: 'success',
      code: 200,
      data: {
        contacts
      }
     })
  } catch(error) {
    console.log(error.message)
  }  
})

// ========================GET by ID==============================

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params   
  try {
    const [contact] = await getContactById(contactId)
    if(contact) {
      res.json({ 
        status: 'success',
        code: 200,
        data: { contact }
       })
    } else {
      res.json({
        status: 'failed',
        code: 404,
        message: "Contact not found"
      })
    }   
  } catch(error){
      console.log(error.message);
  }  
})

// ====================POST=========================

router.post('/', async (req, res, next) => {
  try {
    const validateBody = schema.validate(req.body)
    if(validateBody.error) {
      res.json({
        status: "error",
        code: 400,
        message: `${validateBody.error}`
      })
    } 
    const newContact = await addContact(req.body)
    if (typeof newContact !== "string") {
      res.status(201).json({
        status: "success",
        code: 201,
        data: newContact
      })
    } else {
      res.status(400).json({
        status: 'failed',
        code: 400,
        message: `Missing fields`
      })
    }
  }
  catch(error) {
    console.log(error.message)
    // next(error)
  }
})

// ======================DELETE===================================

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  try {
    const contacts = await listContacts()
    const isExisting = contacts.some(el => el.id === contactId)
    if (isExisting) {
      removeContact(contactId)
      res.status(204).json({
        status: 'success',
        code: 204,
        message: `Contact with ID: ${contactId} deleted`
      })
    } else {
      res.status(404).json({
        status: 'failed',
        code: 404,
        message: 'Contact not found'
      })
    } 
  }
  catch(error) {
    console.log(error.message)
  }
  
})


// ========================PUT================================

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  try {
    const validateBody = schema.validate(req.body)
    if(validateBody.error) {
      res.json({
        status: "error",
        code: 400,
        message: `${validateBody.error}`
      })
    }
    if (Object.keys(req.body)[0]) {
      await updateContact(contactId, req.body)
      const [contact] = await getContactById(contactId)
      if (contact) {
        res.json({ 
          status: 'success',
          code: 200,
          data: contact 
         })
      } else {
        res.status(404).json({
          status: 'failed',
          code: 400,
          message: `Contact with ID: ${contactId} not found`
        })
      }
      
    } else {
        res.status(400).json({
          status: 'failed',
          code: 400,
          message: "missing fields"
        })
    }     
  }
  catch(error) {
    console.log(error.message)
    // next(error)
  } 
})

module.exports = router