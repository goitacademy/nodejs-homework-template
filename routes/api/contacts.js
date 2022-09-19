const express = require('express');

const router = express.Router();

const contacts = require("../../models/contacts");

const {createError} = require('../../helper');

const Joi = require('joi');

const contactAdd = Joi.object({
  name:Joi.string().required(),
  email:Joi.string().required(),
  phone:Joi.string().required(),
});



router.get('/', async (req, res, next) => {
  try{
    res.json(await contacts.listContacts());
  } catch(error){
    next(error);
  };

})


router.get('/:contactId', async (req, res, next) => {
  try{
    const {contactId} = req.params;
    const reply = await contacts.getContactById(contactId);
    if(!reply) {
      throw createError(404, "Note found");
    }
    res.json(reply)
  } catch(error){
    next(error);
  };
  
})

router.post('/', async (req, res, next) => {
  try{
    const {error} = contactAdd.validate(req.body);

    if(error){
      throw createError(400, "missing required name field");
    }

    const reply = await contacts.addContact(req.body);
    res.status(201).json(reply);
  } catch(error) {
    next(error);
  }

});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const reply = await contacts.removeContact(contactId);
    if (!reply) {
      throw createError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }

});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactAdd.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { contactId } = req.params;
    const reply = await contacts.updateContactById(contactId, req.body);
    if (!reply) {
      throw createError(404, "Not found");
    }
    res.json(reply);
  } catch (error) {
    next(error);
  }

});

module.exports = router;
