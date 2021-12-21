const express = require("express");
const { NotFound, BadRequest } = require("http-errors");
const Joi = require("joi");

const contactsOperations = require("../../models/contacts");

const router = express.Router();

const joiSchema = Joi.object({
	name: Joi.string().min(3).max(30).required(),
	email: Joi.string().email().required(),
	phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
	try {
		const contacts = await contactsOperations.getAll();
		res.json(contacts);
	} catch (error) {
		next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		const contact = await contactsOperations.getById(id);
		if (!contact) {
			throw new NotFound();
		}
		res.json(contact);
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const { error } = joiSchema.validate(req.body);
		if (error) {
			throw new BadRequest(error.message);
		}
		const newContact = await contactsOperations.add(req.body);
		res.status(201).json(newContact);
	} catch (error) {
		next(error);
	}
});

router.put("/:id", async (req, res, next) => {
	try {
		const { error } = joiSchema.validate(req.body);
		if (error) {
			throw new BadRequest(error.message);
		}
		const { id } = req.params;
		const updateContact = await contactsOperations.updateById({
			id,
			...req.body,
		});
		if (!updateContact) {
			throw new NotFound();
		}
		res.json(updateContact);
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const deleteContact = await contactsOperations.removeById(id);
		if (!deleteContact) {
			throw new NotFound();
		}
		res.json({ message: "Contact delete" });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
