const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const Joi = require("joi");
const Contact = require("../../models/contact");
const mongoose = require("mongoose");
const { authenticate } = require("../../middlewares");

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
router.get("/", authenticate, async (req, res, next) => {
	try {
		// let { page = 1, limit = 2 } = req.query;
		// page = Number(page);
		// limit = Number(limit);

		// if (isNaN(page) || isNaN(limit)) {
		// 	throw createError(400, "Page and limit must be a number");
		// }
		// const skip = (page - 1) * limit;

		const { _id } = req.user;
		const result = await Contact.find(
			{ owner: _id }
			// { skip, limit: +limit }
		).populate("owner", "email");
		res.json(result);
	} catch (error) {
		next(error);
	}
});

// GET BY ID
router.get("/:contactId", authenticate, async (req, res, next) => {
	try {
		const { contactId } = req.params;

		const ownerId = req.user._id;

		if (!mongoose.Types.ObjectId.isValid(contactId)) {
			throw createError(400, "invalid ID");
		}

		const result = await Contact.findById({ _id: contactId, owner: ownerId });

		if (!result) {
			throw createError(404, "Contact not found!");
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
});

// ADD
router.post("/", authenticate, async (req, res, next) => {
	try {
		const { error } = contactsAddScheme.validate(req.body);
		if (error) {
			throw createError(400, error.message);
		}
		const data = { ...req.body, owner: req.user._id };
		const result = await Contact.create(data);
		return res.status(201).json(result);
	} catch (error) {
		next(error);
	}
});

// DELETE
router.delete("/:contactId", authenticate, async (req, res, next) => {
	try {
		const { contactId } = req.params;

		const ownerId = req.user._id;
		if (!mongoose.Types.ObjectId.isValid(contactId)) {
			throw createError(400, "invalid ID");
		}
		const result = await Contact.findByIdAndDelete({
			_id: contactId,
			owner: ownerId,
		});

		if (!result) {
			throw createError(404, "Contact not found!");
		}
		res.json({ message: "Contact deleted" });
	} catch (error) {
		next(error);
	}
});

// UPDATE
router.put("/:contactId", authenticate, async (req, res, next) => {
	try {
		const { error } = contactsAddScheme.validate(req.body);
		if (error) {
			throw createError(400, error.message);
		}

		const { contactId } = req.params;

		const ownerId = req.user._id;

		if (!mongoose.Types.ObjectId.isValid(contactId)) {
			throw createError(400, "invalid ID");
		}

		const result = await Contact.findByIdAndUpdate(
			{ _id: contactId, owner: ownerId },
			req.body,
			{
				new: true,
			}
		);

		if (!result) {
			throw createError(404, "Contact not found!");
		}
		return res.json(result);
	} catch (error) {
		next(error);
	}
});

// CHANGE STATUS
router.patch("/:contactId/favorite", authenticate, async (req, res, next) => {
	try {
		const { error } = contactsFavoriteScheme.validate(req.body);
		if (error) {
			throw createError(400, error.message);
		}

		const { contactId } = req.params;

		const ownerId = req.user._id;

		if (!mongoose.Types.ObjectId.isValid(contactId)) {
			throw createError(400, "invalid ID");
		}

		const result = await Contact.findByIdAndUpdate(
			{ _id: contactId, owner: ownerId },
			req.body,
			{
				new: true,
			}
		);

		if (!result) {
			throw createError(404, "Contact not found");
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
