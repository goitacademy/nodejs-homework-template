import contacts from "../../models/contacts-models.js";
import { HttpError } from "../../helpers/index.js";
import { Router } from "express";
const router = Router();

router.get("/", async (req, res, next) => {
	try {
		const result = await contacts.listContacts();
		if (!result) {
			throw HttpError(404, "Not found");
		}
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
});

router.get("/:contactId", async (req, res, next) => {
	try {
		const contactId = req.params.contactId;
		const result = await contacts.getContactById(contactId);
		if (!result) {
			throw HttpError(404, "Not found");
		}
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
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

export default router;
