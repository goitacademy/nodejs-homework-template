const express = require('express')
const {contactSchema} = require("../../schemas/")
const router = express.Router()
const contactsOperations = require("../../model/index")
const { message } = require('../../schemas/contact')


router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
     result: contacts
    }
    
  })
    
  } catch (error) {
    next(error);
  }
  
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    if (!result) {
     
      const error = new Error(`Contact with id=${contactId} not found`);
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
  try { 
    const { error } = contactSchema.validate(req.body);
    if (error) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: error.message,
      })
      return
    
    }
    
    const result = await contactsOperations.addContact(req.body)
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
  
})

router.delete('/:contactId', async (req, res, next) => {
 
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Conatct with ID=${contactId} not found`,
      })
      return
    }
    res.json({
      status: "success",
      code: 200,
      message: "Success delete"
    })
  }
  catch (error) {
    next(error);
  }
})

router.put ('/:contactId', async (req, res, next) => {
  
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: error.message,
      })
      return
    }
    const { contactId } = req.params;
    const result = await contactsOperations.updateContactById(contactId, req.body);
    if (!result) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Conatct with ID=${contactId} not found`,
      })
      return
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
      
    })


  } catch (error) {
    next (error)
}

})

module.exports = router
