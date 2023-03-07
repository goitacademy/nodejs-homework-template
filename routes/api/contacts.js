const express = require("express");
const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
} = require("../../models/contacts");
const dataValidation = require("../../utils/validation");
const router = express.Router();

router.get("/", async (req, res, next) => {
	listContacts()
		.then(contacts => {
			if (contacts.length) {
				res.json(contacts);
			} else {
				res.status(404).json({
					contacts: [],
					message: "Not found contacts",
				});
			}
		})
		.catch(error =>
			res.status(500).json({ contacts: [], message: error.message })
		);
});

router.get("/:contactId", async (req, res, next) => {
	getContactById(req.params.contactId)
		.then(contact => {
			res.json(contact);
		})
		.catch(error =>
			res.status(500).json({ contact: {}, message: error.message })
		);
});

router.post("/", async (req, res, next) => {
	const { error } = dataValidation(req.body);
	if (error) {
		return res.status(400).json({ message: error.message });
	}
	addContact(req.body)
		.then(contact => {
			res.status(201).json(contact);
		})
		.catch(error =>
			res.status(500).json({ contacts: {}, message: error.message })
		);
});

router.delete("/:contactId", async (req, res, next) => {
	removeContact(req.params.contactId)
		.then(contact => {
			res.status(204).json(contact);
		})
		.catch(error =>
			res.status(500).json({ contacts: {}, message: error.message })
		);
});

router.put("/:contactId", async (req, res, next) => {
	const { error } = dataValidation(req.body, false);
	if (error) {
		return res.status(400).json({ message: error.message });
	}
	updateContact(req.params.contactId, req.body)
		.then(contact => {
			res.status(202).json(contact);
		})
		.catch(error =>
			res.status(500).json({ contacts: {}, message: error.message })
		);
});

module.exports = router;
