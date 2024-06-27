const express = require('express')
const contacts =require('../../models/contacts')
const router = express.Router()
//const contacts = require('../../models/contacts')
const middle = require('../../middleware/middlewarePost')
const middleId =require('../../middleware/middId')
const validata = require('../../middleware/validar')
const valiputbody =require('../../middleware/validarput')

const Joi = require("joi");
const { Schema, model } = require("mongoose");




router.get('/contacts', async (req, res, next) => {
  
  const list = await contacts.listContacts();
  res.json(list).status(200)
})

router.get('/contacts/:id', async (req, res, next) => {
  const list_id= await contacts.getContactById(req.params.id);
  
  if (!list_id){
   return res.json({message: 'Not found'}).status(400)
  }

  res.json(list_id).status(200) 
  
})

router.post('/contacts', validata, async (req, res, next) => {
  console.log(req.body);
  const newContact = await contacts.addContact(req.body);
  res.json(newContact).status(201)
 
  
})

router.delete('/contacts/:contactId',middleId, async (req, res, next) => {
  const deletedContact = await contacts.removeContact(req.params.contactId);
  if (!deletedContact){
    return res.json({message: 'Not found'}).status(404);
    }
    return res.json({"mensaje": "contacto eliminado"}).status(200)
  //res.json({ message: 'template message' })
})

router.put('/contacts/:contactId',valiputbody, async (req, res, next) => {
  console.log("pasando primer filtro ");
  
  //const actulizar = await contacts.updateContact(req.params.contactId, req.body)
  const actulizar = await contacts.updateContact(req.params.contactId, req.body)
  if(actulizar){
    console.log(actulizar);
    return res.json({"mensaje": "contacto actualizado"}).status(200)
  }
  return res.json({message: 'Not found put'}).status(404);
})

module.exports = router;
