const express = require('express');
const createError = ('http-errors');
const Joi = require('joi');
const router = express.Router()

const contactsOperation = require("../../model/db");

const joiSchema= Joi.object({
  name:Joi.string().required(),
  email:Joi.string().email({ minDomainSegments: 2 }).required(),
  phone:Joi.string().required()
})



//GETALL
router.get('/', async (req, res, next) => {
  try{const contacts = await contactsOperation.getAll();
    res.json(contacts);
  }
  catch(error){
    next(error);
  }
  
})
//GetByID
router.get('/:id', async (req, res, next) => {
 const {id} = req.params;
 try{
   const contacts = await contactsOperation.getById(id);
  res.json(contacts);
  if(!contacts){
    throw new createError(404, "Not found");
  }
}
catch(error){
next(error);
}
 
 });
//ADD
router.post('/', async (req, res, next) => {
  try{
    const {error} = joiSchema.validate(req.body);
    if(error){
      error.status = 400;
      throw error;
    }
const newContacts = await contactsOperation.add(req.body);
res.status(201).json(newContacts);
  }catch{
    next(error);
  }
})
//GEtBYREMOVE
router.delete('/:id', async (req, res, next) => {
  try{
const {id} = req.params;
const deleteContacts = await contactsOperation.removeById(id);
if(!deleteContacts){
  throw new createError(404, "Not found");
}
res.json({"message": "contact deleted"})
  }
  catch(error){
    next(error);
  }
})
//GETBYUPDATE
router.put('/:id', async (req, res, next) => {
  try{
const {id} = req.params;
const updateContacts=await contactsOperation.updateById({id, ...req.body});
const {error} = joiSchema.validate(req.body);
if(error){
  error.status = 400;
  throw error;
}
if(!updateContacts){
  throw new createError(404, "Not found");
}
res.json(updateContacts);

  }
  catch(error){
    next(error);
  }
})

module.exports = router
