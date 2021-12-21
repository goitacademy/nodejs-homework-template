const express = require('express');
const { NotFound, BadRequest } = require("http-errors");
const Joi = require("joi");

const contactsOperations = require("../../model/contacts");

const router = express.Router();

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});


router.get('/', async (req, res, next) => {
  try {
    console.log(contactsOperations);
    const contacts = await contactsOperations.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
})


router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await contactsOperations.getContactById(contactId);
    console.log(contact)
    if (!contact) {
      throw new NotFound();
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
})


router.post('/', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }

    const newContact = await contactsOperations.addContact(req.body);
    res.status(201).json(newContact)
  } catch (error) {
    next(error);

  }

})


router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { contactId } = req.params;
    const updateContact = await contactsOperations.updateContact(
      contactId,
      req.body);
    if (!updateContact) {
      throw new NotFound();
    }
    res.json(updateContact);
  } catch (error) {
    next(error);
  }
})


router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await contactsOperations.removeContact(contactId);
    if (!deleteContact) {
      throw new NotFound();
    }
    res.json("message: contact deleted");
  } catch (error) {
    next(error);
  }
});


module.exports = router;



