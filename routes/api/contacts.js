const express = require("express");
const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
	listContacts()
		.then(contacts => res.json({ contacts }))
		.catch(error =>
			res.status(400).json({ contacts: [], message: error.message })
		);
});

router.get("/:contactId", async (req, res, next) => {
	getContactById(req.params.contactId)
		.then(contact => res.json({ contact }))
		.catch(error =>
			res.status(400).json({ contact: {}, message: error.message })
		);
});

router.post("/", async (req, res, next) => {
	addContact(req.body)
		.then(contacts => res.json({ contacts }))
		.catch(error =>
			res.status(400).json({ contacts: [], message: error.message })
		);
});

router.delete("/:contactId", async (req, res, next) => {
	removeContact(req.params.contactId)
		.then(contacts => res.json({ contacts }))
		.catch(error =>
			res.status(400).json({ contacts: [], message: error.message })
		);
});

router.put("/:contactId", async (req, res, next) => {
	updateContact(req.params.contactId, req.body)
		.then(contacts => res.json({ contacts }))
		.catch(error =>
			res.status(400).json({ contacts: [], message: error.message })
		);
});

module.exports = router;
