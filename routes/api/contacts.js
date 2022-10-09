const express = require('express')
const Contact = require('../../models/contact')
// const contacts = require("../../models/contacts")
const { isValidId } = require('../../heplers/middlewares/isValidId')
const RequestError = require('../../heplers/RequestError')
const router = express.Router()
const Joi = require("joi");
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
})

const updateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
})


router.get('/', async (_, res, next) => {
  try {
    const result = await Contact.find({})
    res.json(result);
  }
  catch(error) {
    next(error)
  }
  


})

router.get('/:contactId', isValidId , async (req, res, next) => {
  try{
    const {contactId} = req.params;
    const result = await Contact.findById(contactId);
    if(!result) {
      throw RequestError(404, "Not found")
   
    }
    res.json(result)

  }
  catch(error){
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if(error){
      throw RequestError(400, error.message)
    }
    const result = await Contact.create(req.body)
    res.status(201).json(result)
  }
  catch(error) {
    next(error)
  }

})

router.delete('/:contactId',isValidId, async (req, res, next) => {
 try{
 const {contactId} = req.params;
 const result = await Contact.findByIdAndRemove(contactId)
 if(!result) {
  throw RequestError(404, "Not found")
}
res.json({
  mesage: "Contact remove"
})

}
 catch(error){
  next(error)
 }
})

router.put('/:contactId',isValidId, async (req, res, next) => {
try{
  const {error} = addSchema.validate(req.body);
  if(error){
    throw RequestError(400, error.message)
  }
  const {contactId} = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  if(!result){
    throw RequestError(404, "Not found")
  }
  res.json(result)
}
catch{
next(error)
}
})



router.patch('/:contactId/favorite',isValidId, async (req, res, next) => {
  try{
    const {error} = updateFavorite.validate(req.body);
    if(error){
      throw RequestError(400, error.message)
    }
    const {contactId} = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if(!result){
      throw RequestError(404, "Not found")
    }
    res.json(result)
  }
  catch{
  next(error)
  }
  })


module.exports = router
