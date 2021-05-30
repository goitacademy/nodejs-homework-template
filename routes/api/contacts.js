const express = require('express')
const router = express.Router()
const Contatcs = require('../../model/repositories/contacts')
const {
  validationCreateContact,
  validationUpdateContact,
} = require("../../model/validator");

router.get('/', async (req, res, next) => {  
  try {    
    const result = await Contatcs.getAll();    
    res.status(200).json({status:'success',code:200, data:{result} })
  } catch (e) {
    next(e)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const result = await Contatcs.getById(req.params.contactId)
    if (result) {
      return res.json({status:'success',code:200, data:{result} })
    }
    return res.json({status:'error',code:404,message:'Not found'})
  } catch (e) {
    next(e);
  }
})

router.post('/',validationCreateContact,async (req, res, next) => {
  try {
    const contact = await Contatcs.create(req.body);
    return res.status(201).json({ status:'success',code:201, data:{contact}})
  } catch (e) {
    next(e);
  }  
})

router.delete('/:contactId', async (req, res, next) => {
  try {
  const result = await Contatcs.remove(req.params.contactId)
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
  const result = await Contatcs.update(req.params.contactId,req.body)
  if (result) {
    return res.json({status:'success',code:200, data:{result} })
  }
  return res.json({status:'error',code:404,message:'Not found'})
} catch (e) {
  next(e);
}
})

module.exports = router
