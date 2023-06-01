const express = require("express");
const contactsService = require("../../models/contacts");
const Joi = require('joi');
const HttpError = require('http-errors')
const router = express.Router();

const contactAddSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
})

router.get("/", async (req, res, next) => {
  const result = await contactsService.listContacts();
  res.status(200).json(result);
});

router.get("/:contactId", async (req, res, next) => {
  const result = await contactsService.getById(req.params.contactId);
  console.log(result);
  if(!result){
	return res.status(404).json({message: "Not Found"})
  }
  res.status(200).json(result);
});

router.post("/", async (req, res, next) => {
	try {
		const {error} = contactAddSchema.validate(req.body)
		if(error){
			throw HttpError(400, {"message": "missing required name field"})
		}
		const result = await contactsService.addContact(req.body);
		res.status(201).json(result)
	} catch (error) {
		return error.message
	}
});

router.delete("/:contactId", async (req, res, next) => {
	const result = await contactsService.removeContact(req.params.contactId);
	if(!result){
	  return res.status(404).json({message: "Not Found"})
	}
	res.status(200).json({"message": "contact deleted"});
  });

router.put("/:contactId", async (req, res, next) => {
  try {
	const {error} = contactAddSchema.validate(req.body)
	if(error){
		throw HttpError(400, {"message": "missing required name field"})
	}
	const result = await contactsService.updateContact(req.params.contactId, req.body)
	res.status(200).json(result)
  } catch (error) {
	return res.status(404).json({message: "Not Found"})
  }
});

module.exports = router;
