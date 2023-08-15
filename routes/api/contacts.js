const express = require("express");

const router = express.Router();

const { listContacts } = require("../../models/contacts.js");

router.get("/", async (req, res, next) => {
	try {
		const contacts = await listContacts();
		res.json({
			status: "success",
			code: 200,
			data: {
				contacts,
			},
		});
	} catch (error) {
		console.error("Błąd oczytu pliku: ", error.message);
		next(error);
	}
});

router.get("/:contactId", async (req, res, next) => {
	res.json({ message: "template message" });
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
