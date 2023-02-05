const express = require("express");

const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
} = require("../../models/contacts");

const router = express.Router();

const Joi = require("joi");

const schema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
	try {
		const result = await listContacts();
		console.log("test");
		res.status(200).json(result);
	} catch (err) {
		next(err);
	}
});

router.get("/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		const result = await getContactById(id);
		if (result) {
			res.status(200).json(result);
		} else {
			res.status(404).json({ message: "Not found" });
		}
	} catch (err) {
		next(err);
	}
});

router.post("/", async (req, res, next) => {
	const { name, email, phone } = req.body;
	console.log(req.body);
	try {
		const { error } = schema.validate(req.body);
		if (error) {
			res.status(400).json({ message: result.error.message });
		} else {
			const result = addContact(name, email, phone);
			res.status(200).json(result);
		}
	} catch (err) {
		next(err);
	}
});

router.delete("/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		const result = await removeContact(id);
		if (!result) {
			res.status(404).json({ message: "Not found" });
		} else {
			res.status(200).json(result);
		}
	} catch (err) {
		next(err);
	}
});

router.put("/:id", async (req, res, next) => {
	const { id } = req.params;
	const { name, email, phone } = req.body;
	const { error } = schema.validate(req.body);

	try {
		if (error) {
			res.status(400).json({ message: "missing required name field" });
			return;
		}

		const result = await updateContact(id, { name, email, phone });
		if (!result) {
			res.status(404).json({ message: "Not found" });
		} else {
			res.json(result);
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
