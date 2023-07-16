import express from "express";

import { listContacts, getContactById, addContact, removeContact } from "../../models/contacts.js";

import HTTPError from "../../helpers/HTTPError.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
	try {
		const contacts = await listContacts();
		res.json(contacts);
	} catch (e) {
		next(e);
	}
});

router.get("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contact = await getContactById(contactId);

		if (!contact) {
			throw HTTPError(404, `Movie with id '${contactId}' not found!`);
		}
		res.json(contact);
	} catch (e) {
		next(e);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const body = req.body;

		const contact = await addContact(body);
		res.json(contact);
	} catch (e) {
		next(e);
	}
});

router.delete("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contact = await removeContact(contactId);

		if (!contact) {
			throw HTTPError(404, `Movie with id '${contactId}' not found!`);
		}

		res.json(contact);
	} catch (e) {
		next(e);
	}
});

router.put("/:contactId", async (req, res, next) => {
	try {
		res.json({ message: "template message" });
	} catch (e) {
		next(e);
	}
});

export default router;
