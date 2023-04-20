const express = require("express");
const { NotFound, BadRequest, Conflict } = require("http-errors");

const router = express.Router();
const contactsOperations = require("../../models/contacts");

router.get("/", async (req, res, next) => {
	try {
		const result = await contactsOperations.listContacts();
		res.json(result);
	} catch (error) {
		next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const result = await contactsOperations.getContactById(req.params.id);
		res.json(result);
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const result = await contactsOperations.addContact(req.body);
		if (!result) {
			throw new Conflict("this person is already in your contacts");
		}
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await contactsOperations.removeContact(id);

		if (!result) {
			throw new NotFound(`Contact with id: ${id} not found`);
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
});

router.put("/:id", async (req, res, next) => {
	const { id } = req.params;
	const { name, email, phone } = req.body;
	if (!name || !email || !phone) {
		throw new BadRequest("missing fields");
	}
	const result = await contactsOperations.updateContact(id, req.body);

	res.json(result);
});

module.exports = router;
