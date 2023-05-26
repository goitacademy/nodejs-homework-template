const express = require("express");
const Joi = require("joi");

const contactsService = require("../../models/contactsService");
const HttpError = require("../../utlils");

const validateMessages = field => {
	return {
		"string.base": `${field} should be a type of 'text'`,
		"string.empty": `${field} cannot be an empty field`,
		"any.required": `missing required ${field} field`,
	};
};

const addSchema = Joi.object({
	name: Joi.string().required().messages(validateMessages("name")),
	email: Joi.string().required().messages(validateMessages("email")),
	phone: Joi.number().required().messages(validateMessages("phone")),
}).min(1);

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

		res.json({message: "contact deleted"});
	} catch (err) {
		next(err);
	}
});

router.put("/:contactId", async (req, res, next) => {
	try {
		const {contactId} = req.params;
		const {error} = addSchema.validate(req.body);
		if (!Object.keys(req.body).length) throw HttpError(400, "missing fields");
		if (error) throw HttpError(400, error.message);

		const result = await contactsService.updateContact(contactId, req.body);
		if (!result) throw HttpError(404);

		res.json(result);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
