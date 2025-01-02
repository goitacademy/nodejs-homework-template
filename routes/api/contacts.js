const express = require("express");

const router = express.Router();

const {
	listContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact,
	updateStatusContact,
} = require("../../models/contacts");

const { contactSchema } = require("../../models/validation");

router.get("/", async (req, res, next) => {
	try {
		const contacts = await listContacts();
		res.status(200).json(contacts);
	} catch (error) {
		next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const contact = await getContactById(id);
		if (!contact) {
			return res.status(404).json({ message: "Not found" });
		}
		res.status(200).json(contact);
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const deleted = await removeContact(id);
		if (!deleted) {
			return res.status(404).json({ message: "Not found" });
		}
		res.status(200).json({ message: "Contact deleted" });
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const { error } = contactSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}

		const newContact = await addContact(req.body);
		res.status(201).json(newContact);
	} catch (error) {
		next(error);
	}
});

router.put("/:id", async (req, res, next) => {
	try {
		const { error } = contactSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.details[0].message });
		}

		const { id } = req.params;
		const updateFields = req.body;

		const updatedContact = await updateContact(id, updateFields);

		if (!updatedContact) {
			return res.status(404).json({ message: "Not found" });
		}

		res.status(200).json(updatedContact);
	} catch (error) {
		next(error);
	}
});

router.patch("/:id/favorite", async (req, res, next) => {
	try {
		const { id } = req.params;
		const { favorite } = req.body;

		if (favorite === undefined) {
			return res
				.status(400)
				.json({ message: "Missing field 'favorite'" });
		}

		const updatedContact = await updateStatusContact(id, favorite);

		if (!updatedContact) {
			return res.status(404).json({ message: "Not found" });
		}

		res.status(200).json(updatedContact);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
