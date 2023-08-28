const express = require("express");
const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
} = require("../../models/contacts");
const Joi = require("joi");

const router = express.Router();

router.get("/", async (req, res, next) => {
	const contacts = await listContacts();
	res.status(200).json({
		data: { contacts },
	});
});

router.get("/:contactId", async (req, res, next) => {
	const contactById = await getContactById(req.params.contactId);
	if (contactById) {
		res.status(200).json({
			data: { contactById },
		});
	} else {
		res.status(404).json({
			message: "Not found",
		});
	}
});

router.post("/", async (req, res, next) => {
	const body = await req.body;

	const schema = Joi.object({
		name: Joi.string().min(3).max(35).required(),
		email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
			.required(),
		phone: Joi.string().required(),
	});

	const { error } = schema.validate(body);

	if (!error) {
		const newContact = await addContact(body);
		res.status(201).json({
			data: { newContact },
		});
	} else {
		res.status(404).json({
			message: "missing required name - field",
		});
	}
});

router.delete("/:contactId", async (req, res, next) => {
	const updatedList = await removeContact(req.params.contactId);
	if (updatedList) {
		res.status(200).json({
			message: "contact deleted",
		});
	} else {
		res.status(404).json({
			message: "Not found",
		});
	}
});

router.put("/:contactId", async (req, res, next) => {
	const body = req.body;

	const schema = Joi.object({
		name: Joi.string().min(3).max(35),
		email: Joi.string().email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		}),
		phone: Joi.string(),
	}).or('name', 'email', 'phone');
	
	const { error } = schema.validate(body);

	try {
		const contactById = await updateContact(req.params.contactId, body);
		if (!error) {
			console.log(contactById.id);

			res.status(200).json({
				data: { contactById },
			});
		} else {
			res.status(400).json({
				message: "missing fields",
			});
		}
	} catch (err) {
		res.status(404).json({
			message: "Not found",
		});
	}
});

module.exports = router;
