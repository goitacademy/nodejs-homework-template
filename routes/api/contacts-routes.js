const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const Joi = require("joi");
const Contact = require("../../models/contact");

const contactsAddScheme = Joi.object({
	name: Joi.string().required(),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		})
		.required(),
	phone: Joi.string().required(),
});

const contactsFavoriteScheme = Joi.object({
	favorite: Joi.boolean().required(),
});

// GET ALL
router.get("/", async (req, res, next) => {
	try {
		const result = await Contact.find();
		res.json(result);
	} catch (error) {
		next(error);
	}
});

// GET BY ID
router.get("/:contactId", async (req, res, next) => {
	try {
		const id = req.params.contactId;
		const result = await Contact.findById(id);
		if (!result) {
			throw createError(404, "Contact not found!");
		}
		res.json(result);
	} catch (error) {
		if (error.message.includes("Cast to ObjectId failed")) {
			error.status = 404;
		}
		next(error);
	}
});

// ADD
router.post("/", async (req, res, next) => {
	try {
		const { error } = contactsAddScheme.validate(req.body);
		if (error) {
			throw createError(400, error.message);
		}
		const result = await Contact.create(req.body);
		return res.status(201).json(result);
	} catch (error) {
		if (error.message.includes("Validation failed")) {
			error.status = 400;
		}
		next(error);
	}
	res.json({ message: "Contact sucessfully added" });
});

// DELETE
router.delete("/:contactId", async (req, res, next) => {
	try {
		const id = req.params.contactId;
		const result = await Contact.findByIdAndDelete(id);
		if (!result || !id) {
			throw createError(404, "Contact not found!");
		}
		res.json({ message: "Contact deleted" });
	} catch (error) {
		next(error);
	}
});

// UPDATE
router.put("/:contactId", async (req, res, next) => {
	try {
		const { error } = contactsAddScheme.validate(req.body);
		if (error) {
			throw createError(400, error.message);
		}
		const id = req.params.contactId;

		const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
		if (!result) {
			throw createError(404, "Contact not found!");
		} else if (req.body === null) {
			res.json({ message: "Missing fields" });
		}
		return res.json(result);
	} catch (error) {
		next(error);
	}

	res.json({ message: "Contact sucessfully updated" });
});

// CHANGE STATUS
router.patch("/:contactId/favorite", async (req, res, next) => {
	try {
		const { error } = contactsFavoriteScheme.validate(req.body);
		if (error) {
			throw createError(400, error.message);
		}
		const id = req.params.contactId;
		const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
		if (!result) {
			throw createError(404, "Contact not found");
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
