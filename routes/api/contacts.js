const express = require("express");
const { NotFound, BadRequest } = require("http-errors");
const Joi = require("joi");

const contactSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
		.required(),
	phone: Joi.string().required(),
});

const router = express.Router();

const {
	listContacts,
	getContactById,
	addContact,
	updateContact,
	removeContact,
} = require("../../models/contacts");

router.get("/", async (res, next) => {
	try {
		const contacts = await listContacts();
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

router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const contact = await getContactById(id);
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
			throw new BadRequest(`Missing required name field`);
		}
		const newContact = await addContact(req.body);
		res.status(201).json({
			status: "success",
			code: 201,
			newContact,
		});
	} catch (error) {
		next(error);
	}
});

router.put("/:id", async (req, res, next) => {
	try {
		const { error } = contactSchema.validate(req.body);
		if (error) {
			throw new BadRequest(`Missing required name field`);
		}
		const { id } = req.params;
		const updateParam = await updateContact(id, req.body);
		if (!updateParam) {
			throw new NotFound(`Contact with id=${id} not found`);
		}
		res.json({
			status: "success",
			code: 200,
			updateParam,
		});
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const deleteContact = await removeContact(id);
		if (!deleteContact) {
			throw new NotFound(`Contact with id=${id} not found`);
		}
		res.json({
			status: "success",
			code: 200,
			message: `Contact with id=${id} deleted`,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
