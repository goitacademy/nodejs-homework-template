const express = require("express");
const operations = require("../../models/contacts");
const HttpError = require("../../helpers/HttpError");
const Joi = require("joi");

const router = express.Router();

const contactAddSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
	try {
		const result = await operations.listContacts();
		res.json(result);
	} catch (error) {
		next(error);
	}
});

router.get("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await operations.getContactById(contactId);
		if (!result) {
			throw HttpError(404, "Not found");
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const { error } = contactAddSchema.validate(req.body);
		if (error) {
			throw HttpError(400, "Missing required name field ");
		}
		const result = await operations.addContact(req.body);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
});

router.delete("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		if (!contactId) {
			throw HttpError(404, "Not found");
		}
		res.json({ message: "Contact deleted" });
	} catch (error) {
		next(error);
	}
});

router.put("/:contactId", async (req, res, next) => {
	try {
		const { error } = contactAddSchema.validate(req.body);
		if (error) {
			throw HttpError(400, "Missing fields");
		}
		const { contactId } = req.params;
		const result = await operations.updateContact(contactId, req.body);
		if (!result) {
			throw HttpError(404, "Not found");
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
