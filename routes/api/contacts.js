const express = require("express");

const router = express.Router();

const { listContacts, getContactById } = require("../../models/contacts.js");

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
		const contactId = req.params.contactId;
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
	res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
	res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
	res.json({ message: "template message" });
});

module.exports = router;
