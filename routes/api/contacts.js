const express = require("express");
const Joi = require("joi");

const contactsService = require("../../models/contactsService");
const HttpError = require("../../utlils");

const addSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.number().required(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
	try {
		const result = await contactsService.listContacts();
		res.json(result);
	} catch (err) {
		next(err);
	}
});

router.get("/:contactId", async (req, res, next) => {
	try {
		const {contactId} = req.params;
		const result = await contactsService.getContactById(contactId);
		if (!result) throw HttpError(404);

		res.json(result);
	} catch (err) {
		next(err);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const {error} = addSchema.validate(req.body);
		if (error) throw HttpError(400, error.message);

		const result = await contactsService.addContact(req.body);
		res.status(201).json(result);
	} catch (err) {
		next(err);
	}
});

router.delete("/:contactId", async (req, res, next) => {
	try {
		const {contactId} = req.params;
		const result = await contactsService.removeContact(contactId);
		if (!result) throw HttpError(404);

		res.json({message: `Contact with id ${contactId} succesfully deleted`});
	} catch (err) {
		next(err);
	}
});

router.put("/:contactId", async (req, res, next) => {
	try {
		const {contactId} = req.params;
		const {error} = addSchema.validate(req.body);
		if (error) throw HttpError(400, error.message);

		const result = await contactsService.updateContact(contactId, req.body);
		if (!result) throw HttpError(404);

		res.json(result);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
