const express = require("express");
const router = express.Router();
const {NotFound, BadRequest} = require("http-errors");
const Joi = require("joi");

const contactsOperation = require("../../models/index")

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperation.listContacts();
    res.json(contacts);
  } catch (e) {
    next(e);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const contact = await contactsOperation.getContactById(contactId);
    if(!contact) {
      throw new NotFound();
    }
    res.json(contact);
  } catch(e){
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {error} = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest("missing required name filed");
    }
    const newContact = await contactsOperation.addContact(req.body);
    res.status(201).json(newContact);
  } catch(e) {
    next(e);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const deleteContact = await contactsOperation.removeContact(contactId);
    if (!deleteContact) {
      throw new NotFound();
    }
    res.json("nessage: contact deleted");
  } catch(e) {
    next(e);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = joiShema.validate(req.body);
    if (error) {
      throw new BadRequest("message: missing fields");
    }
    const { contactId } = req.params;
    const updatrContact = await contactsOperation.updateContact(contactId, req.body);
    res.json(updatrContact);
  } catch (e) {
    next(e);
  }
});

module.exports = router;