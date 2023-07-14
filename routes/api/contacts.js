const express = require("express");
const contactsRouter = express.Router();
const contactsService = require("../../models/contacts");
const { HttpError } = require('../../helpers');
const Joi = require('joi');

const contactAddSchema = Joi.object({
	name: Joi.string().required().messages({
		"any.required" : "missing required name field"
	}),
	email: Joi.string().required().messages({
		"any.required" : "missing required email field"
	}),
	phone: Joi.string().required().messages({
		"any.required" : "missing required phone field"
	}),
})

contactsRouter.get("/", async (req, res, next) => {
  try {
		const contacts = await contactsService.listContacts();
		
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

contactsRouter.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const contact = await contactsService.getContactById(id);

		if (!contact) throw HttpError(404, `Not found`)
		res.json(contact);
	}
	catch (error) {
		next(error);
	}
});

contactsRouter.post("/", async (req, res, next) => {
	try {
		const { error } = contactAddSchema.validate(req.body)
		if(error) throw HttpError(400, error.message)

		const result = await contactsService.addContact(req.body)
		res.status(201).json(result)
	}
	catch (error) {
		next(error)
	}
});

contactsRouter.put("/:id", async (req, res, next) => {
	try {
		const { name, email, phone } = req.body;
		if(!name && !email && !phone) throw HttpError(400, "missing fields")
		
		const { error } = contactAddSchema.validate(req.body)
		if (error) throw HttpError(400, error.message)
		
		const { id } = req.params;
		
		const contact = await contactsService.updateContact(id, req.body)

		
		if (!contact) throw HttpError(404, `Not found`)
		res.json(contact);
 }
 catch (error) {
	 next(error);	
 }
});

contactsRouter.delete("/:id", async (req, res, next) => {
 try {
	 const { id } = req.params;

	 const contact = await contactsService.removeContact(id)
	 if (!contact) throw HttpError(404, `Not found`)
		res.json({"message": "contact deleted"});
 }
 catch (error) {
	next(error)
 }
});


module.exports = contactsRouter;
