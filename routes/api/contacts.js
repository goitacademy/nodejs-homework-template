const express = require('express')
const { listContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact } = require('../../db/controller')
const { contactSchemaPost, contactSchemaPut, contactSchemaPatch } = require('../../validate/validateContacts')

const router = express.Router()




// ======GET_LIST_CONTACTS=======
router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.status(200).json({ result:{
      status: "success",
      code: 200,
      data: contacts
    }})
  } catch (error) {
    next(error)
  }
})


// ======GET_CONTACT=======
router.get('/:contactId', async (req, res, next) => {
  try {
    const contactById = await getContactById(req.params.contactId) 
    if (!contactById) {
      res.status(404).json({ result: {
        status: "rejected",
        code: 404,
        message: "Not found" 
      }})
      return
    }
    res.status(200).json({ result: {
      status: "success",
      code: 200,
      data: contactById 
    }})
  } catch (error) {
    next(error)
  }
})



// ======ADD_CONTACT=======
router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchemaPost.validate(req.body);
    if (error) {
      res.status(400).json({result:{
        status: "rejected",
          code: 400,
          message: "missing required name field"
        }
      })
      throw error;
    }
    const newContact = await addContact(req.body)
    res.status(201).json({ result:{
      status: "success",
      code: 201,
      data: newContact 
    }})
  } catch (error) {
    next(error)
  }
})



// ======REMOVE_CONTACT=======
router.delete('/:contactId', async (req, res, next) => {
  try {
    const removeContactId = await removeContact(req.params.contactId)
    if (!removeContactId) {
      res.status(404).json({ result:{
        status: "rejected",
        code: 404,
        message: "Not found"
      }})
      return
    }
    
    res.status(200).json({ result:{
      status: "success",
      code: 200,
      message: "contact deleted"
    }})
  } catch (error) {
    next(error)
  }
})



// ======UPDATE_CONTACT=======
router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = contactSchemaPut.validate(req.body)
    if (error) {
      res.status(400).json({ result: {
        status: "rejected",
        code: 400,
        message: "missing fields"
      }})
      throw error
    }
    const contactUpdate = await updateContact(req.params.contactId, req.body)
    res.json({ result: {
      status: "success",
      code: 200,
      data: contactUpdate
    }})
  } catch (error) {
    next(error)
  }
})




// ======PATCH_CONTACT=======
router.patch('/:contactId/favorite', async (req,res,next)=>{
  try {
    const {error} = contactSchemaPatch.validate(req.body)
    if (error) {
      res.status(400).json({ result: {
        status: "rejected",
        code: 400,
        message: "missing field favorite",
      }})
      throw error
    }
    const patchFavorite = await updateStatusContact(req.params.contactId, req.body)
    res.json({result: {
      status: "success",
      code: 200,
      data: patchFavorite
    }})
  } catch (error) {
    next(error)
  }
})


contactSchemaPatch


module.exports = router
