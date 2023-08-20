const express = require("express");
const Joi = require("joi");
const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
} = require("../../models/contacts");

const router = express.Router();

const schema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
	res.status(200).json(JSON.parse(await listContacts()));
});

router.get("/:contactId", async (req, res, next) => {
	const { contactId } = req.params;
	const id = getContactById(contactId);
	if (id === undefined) {
		return res.status(404).json({ message: "Not found" });
	} else {
		return res.status(200).json(await id);
	}
});

router.post("/", async (req, res, next) => {
	const { name, email, phone } = req.body;
	const validation = schema.validate({ name, email, phone });
	if (validation.error) {
		return res.status(400).json({
			message: `${validation.error.details[0].message}`,
		});
	}
	const newContact = addContact({ name, email, phone });
	res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
	const { contactId } = req.params;
	const id = removeContact(contactId);
	if (id.length === 0) {
		return res.status(404).json({ message: "Not found" });
	} else {
		return res.status(200).json({ message: "contact deleted" });
	}
});

router.put("/:contactId", async (req, res, next) => {
	const { contactId } = req.params;
	const { name, email, phone } = req.body;

	if (name === "" || email === "" || phone === "") {
		return res.status(400).json({ message: "missing fields" });
	}
	const validation = schema.validate({ name, email, phone });

	if (validation.error) {
		return res.status(400).json({
			message: `${validation.error.details[0].message}`,
		});
	}

	const editedContact = updateContact(contactId, { name, email, phone });
	if (editedContact === undefined) {
		return res.status(404).json({ message: "Not found" });
	}
	res.status(200).json(editedContact);
});

module.exports = router;
