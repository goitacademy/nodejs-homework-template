const express = require('express');
const contactsHandler = require("../../models/contacts.js");
const router = express.Router();
const Joi = require("joi");

const joi = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsHandler.listContacts();
    res.json({ status: "Done", code: 200, data: { result } });
  } catch (err) {
    console.log(err)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params
    const result = await contactsHandler.getContactById(contactId);
    if(!result){
      console.log('ID Not Found!')
    }
    res.json({ status: "Done", code: 200, data: { result } });
  } catch (err) {
    console.log(err)
  }
})

router.post('/', async (req, res) => {
  try{
    if(joi.validate(req.body)){
      console.log("Missing field!")
    }
    const result = contactsHandler.addContact(req.body)
    res.status(201).json({status: "success", code: 201, data: {result}})
  
  }
 catch(err){
    console.log(err)
 }})

router.delete('/:contactId', async (req, res, next) => {
  try{
    const {contactId} = req.params
    const result = await contactsHandler.removeContact(contactId)
    if(!result){
      console.log("Not Found!")
    }
    res.status(200).json({
      status: "Done",
      code: 200,
      data: { result },
      message: "Contact deleted",
    });
  } catch(err){
    console.log(err)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    if (joi.validate(req.body)) {
      console.log("Missing fields");
    }
    const { contactId } = req.params;
    const result = await contactsHandler.updateContact(contactId, req.body);
    if (!result) {
      console.log(`Not found`);
    }

    res.status(200).json({ status: "Done", code: 200, data: { result } });
  } catch (err) {
    console.log(err);
  }
})

module.exports = router
