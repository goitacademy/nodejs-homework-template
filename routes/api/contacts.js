const express = require("express");
const Joi = require("joi");

const router = express.Router();

const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
} = require("../../models/contacts");

const { HttpError } = require("../../helpers");

const addSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
	try {
		const result = await listContacts();
		if (!result) {
			throw HttpError(404, "Server error");
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
});

router.get("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await getContactById(contactId);

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
		const { error } = addSchema.validate(req.body);
		if (error) {
			throw HttpError(400, error.message);
		} else {
			const result = await addContact(req.body);
			res.status(201).json(result);
		}
	} catch (error) {
		next(error);
	}
});

router.delete("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await removeContact(contactId);
		if (!result) {
			throw HttpError(404, "Not found");
		}
		res.status(200).json({"message": "contact deleted"});

	} catch (error) {
		next(error)
	}
});

router.put("/:contactId", async (req, res, next) => {
	try {
		const { error } = addSchema.validate(req.body);
		if (error) {
			throw HttpError(400, "missing fields");
		}
		const { contactId } = req.params;
		const result = await updateContact(contactId, req.body);
		if (!result) {
			throw HttpError(404, "Not found");
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
