const express = require("express");

const router = express.Router();

const { listContacts, getContactById, addContact, removeContact, updateContact } = require("../../models/contacts.js");

router.get("/", async (req, res, next) => {
	try {
		const contacts = await listContacts();
		res.json({
			status: "success",
			code: 200,
			results: contacts.length,
			data: {
				contacts,
			},
		});
	} catch (error) {
		console.error("Error reading file: ", error.message);
		next(error);
	}
});

router.get("/:contactId", async (req, res, next) => {
	try {
		const contactId = await req.params.contactId;
		const contact = await getContactById(contactId);
		if (contact) {
			res.json({
				status: "success",
				code: 200,
				data: {
					contact,
				},
			});
		} else {
			res.status(404).json({
				status: "fail",
				message: "Not found",
			});
		}
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const { name, email, phone } = await req.body;

		if (!name || !email || !phone) {
			return res.status(400).json({
				status: "fail",
				message: "Missing required fields: name, email, phone",
			});
		}

		const newContact = await addContact({ name, email, phone });

		res.json({
			status: "success",
			code: 201,
			data: {
				newContact,
			},
		});
	} catch (error) {
		next(error);
	}
});

router.delete("/:contactId", async (req, res, next) => {
	try {
		const contactId = await req.params.contactId;
		const contact = await removeContact(contactId);
		if (contact) {
			res.json({
				status: "success",
				code: 200,
				message: "contact deleted",
				data: {
					contact,
				},
			});
		} else {
			res.status(404).json({
				status: "fail",
				message: "Not found",
			});
		}
	} catch (error) {
		next(error);
	}
});

router.put("/:contactId", async (req, res, next) => {
	try {
		const contactId = req.params.contactId;
		const { name, email, phone } = await req.body;

		if (!name || !email || !phone) {
			return res.status(400).json({
				status: "fail",
				message: "Missing fields",
			});
		}

		const updateData = await updateContact(contactId, { name, email, phone });

		res.json({
			status: "success",
			code: 200,
			data: {
				updateData,
			},
		});
	} catch (error) {
		if (error.message === "Contact not found") {
			res.status(404).json({
				status: "fail",
				message: "Not found",
			});
		} else {
			next(error);
		}
	}
});

module.exports = router;
