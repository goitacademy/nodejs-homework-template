const express = require('express')
const router = express.Router()
const Contatcs = require('../../model')
const {
  validationCreateContact,
  validationUpdateContact,
} = require("../../model/validator");

router.get('/', async (req, res, next) => {  
  try {    
    const result = await Contatcs.listContacts();    
    res.status(200).json({status:'success',code:200, data:{result} })
  } catch (e) {
    next(e)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const result = await Contatcs.getContactById(req.params.contactId)
    if (result) {
      return res.json({status:'success',code:200, data:{result} })
    }
    return res.json({status:'error',code:404,message:'Not found'})
  } catch (e) {
    next(e);
  }
})

router.post('/', validationCreateContact,async (req, res, next) => {
  try {
    const contact = await Contatcs.addContact(req.body);
    return res.status(201).json({ status:'success',code:201, data:{contact}})
  } catch (e) {
    next(e);
  }
  
})

router.delete('/:contactId', async (req, res, next) => {
  try {
  const result = await Contatcs.removeContact(req.params.contactId)
  if (result) {
    return res.json({status:'success',code:200, data:{result} })
  }
  return res.json({status:'error',code:404,message:'Not found'})
} catch (e) {
  next(e);
}
})

router.put('/:contactId',validationUpdateContact, async (req, res, next) => {
    try {
  const result = await Contatcs.updateContact(req.params.contactId,req.body)
  if (result) {
    return res.json({status:'success',code:200, data:{result} })
  }
  return res.json({status:'error',code:404,message:'Not found'})
} catch (e) {
  next(e);
}
})

module.exports = router
