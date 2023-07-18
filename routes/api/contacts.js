import express from "express";

import { listContacts, getContactById, addContact, removeContact, updateContact } from "../../models/contacts.js";

import HTTPError from "../../helpers/HTTPError.js";
import userAddSchema from "../../schemas/schemas.js";

const router = express.Router();

router.get("/", async (_, res, next) => {
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
		const { error } = userAddSchema.validate(body);

		if (error) {
			throw HTTPError(400, error.message);
		}

		const contact = await addContact(body);
		res.status(201).json(contact);
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

		res.json({ message: "contact deleted" });
	} catch (e) {
		next(e);
	}
});

router.put("/:contactId", async (req, res, next) => {
	try {
		const body = req.body;
		const { contactId } = req.params;

		const { error } = userAddSchema.validate(body);

		if (error) {
			throw HTTPError(400, error.message);
		}

		const contact = await updateContact(contactId, body);

		if (!contact) {
			throw HTTPError(404, `Movie with id '${contactId}' not found!`);
		}

		res.json(contact);
	} catch (e) {
		next(e);
	}
});

export default router;
