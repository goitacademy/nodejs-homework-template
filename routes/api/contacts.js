const express = require("express");
const router = express.Router();
const { NotFound } = require("http-errors");
const Joi = require("joi");

const contactSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	phone: Joi.string().required(),
});

const contactsOperation = require("../../models/contacts");

router.get("/", async (req, res, next) => {
	try {
		const contacts = await contactsOperation.listContacts();

		res.json({
			status: "success",
			code: 200,
			data: {
				result: contacts,
			},
		});
	} catch (error) {
		next(error);
	}
});

router.get("/:contactId", async (req, res, next) => {
	try {
		const id = req.params.contactId;
		const contact = await contactsOperation.getContactById(id);

		if (!contact) {
			throw new NotFound(`Contact with id=${id} not found`);
		}

		res.json({
			status: "success",
			code: 200,
			data: {
				result: contact,
			},
		});
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const { error } = contactSchema.validate(req.body);
		if (error) {
			error.status = 400;
			throw error;
		}
		const newContact = await contactsOperation.addContact(req.body);
		res.status(201).json({
			status: "success",
			code: 201,
			data: {
				result: newContact,
			},
		});
	} catch (error) {
		next(error);
	}
});

router.delete("/:contactId", async (req, res, next) => {
	try {
		const id = req.params.contactId;
		const removeContact = await contactsOperation.removeContact(id);

		if (!removeContact) {
			throw new NotFound(`Contact with id=${id} not found`);
		}

		res.json({
			status: "success",
			message: "contact deleted",
			code: 200,
			data: {
				result: removeContact,
			},
		});
	} catch (error) {
		next(error);
	}
});

router.put("/:contactId", async (req, res, next) => {
	try {
		const { error } = contactSchema.validate(req.body);

		if (error) {
			error.status = 400;
			throw error;
		}

		const id = req.params.contactId;

		const updateContact = await contactsOperation.updateContact(id, req.body);
		if (!updateContact) {
			throw new NotFound(`Contact with id=${id} not found`);
		}

		res.json({
			status: "success",
			code: 200,
			data: {
				result: updateContact,
			},
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
