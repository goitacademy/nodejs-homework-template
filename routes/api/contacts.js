const express = require("express");
const Joi = require("joi");

const router = express.Router();
const contactsServices = require("../../models/contacts")
const { HttpError } = require("../../helpers");
const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"missing required name field"`}),
  email: Joi.string().required().messages({
    "any.required": `"missing required email field"`}),
  phone: Joi.string().required().messages({
    "any.required": `"missing required phone field"`})
})

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsServices.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(contactId);
    const contact = await contactsServices.getContactById(contactId);
    if (!contact) {
      throw HttpError(404, "Not Found");
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if(error){
      throw HttpError(400, error.message)
    };  
    const result = await contactsServices.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contactsServices.removeContact(contactId);
    if(!result){
      throw HttpError(404, "Not Found");
    }
    res.json({
      "message": "contact deleted"});
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if(error){
      throw HttpError(400, error.message)
    };
    const {contactId} = req.params;
    const result = await contactsServices.updateContact(contactId, req.body);
   
    res.status(200).json(result);
    
  } catch (error) {
    next(error);
  }
});

module.exports = router;
