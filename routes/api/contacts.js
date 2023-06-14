const functions = require("../../controlers");
const express = require("express");
const fs = require("fs");
const router = express.Router();
const Joi = require("joi");

const schema = Joi.object({
	name: Joi.string().required(),
	phone: Joi.number().required(),
	email: Joi.string().email().required(),
});

router.get("/", async (req, res, next) => {
	let contactList = await functions.listContacts();
	res.json({ status: "success", code: 200, data: { contactList } });
});

router.get("/:contactId", async (req, res, next) => {
	const id = req.params.contactId;
	let getContact = await functions.getContactById(id);
	if (getContact.length) {
		res.json({ status: "success", code: 200, data: { getContact } });
	} else {
		res.status(404).json({
			status: "error",
			code: 404,
			message: "Not found",
		});
	}
});

router.post("/", async (req, res, next) => {
	const { error, value } = schema.validate(req.body);
	if (error) {
		return res.status(400).json({
			status: "error",
			code: 400,
			message: `missing required name: ${error.details[0].message}`,
		});
	}
	const addContact = await functions.addContact(value);
	return res.json({ status: "success", code: 201, data: { addContact } });
});

router.delete("/:contactId", async (req, res, next) => {
	const id = req.params.contactId;
	let deleteContact = await functions.removeContact(id);
	if (deleteContact.length) {
		res.json({ message: "contact deleted", code: 200 });
	} else {
		res.status(404).json({
			status: "error",
			code: 404,
			message: "Not found",
		});
	}
});

router.put("/:contactId", async (req, res, next) => {
	const body = req.body;
	const id = req.params.contactId;
	const { error, value } = schema.validate(body);
	if (error) {
		return res.status(400).json({
			status: "error",
			code: 400,
			message: `missing fields: ${error.details[0].message}`,
		});
	}
	const updateContact = await functions.updateContact(id, value);
	return res.json({ status: "success", code: 200, data: { updateContact } });
});

module.exports = router;
