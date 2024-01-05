import express from "express";
import Joi from "joi";
import * as contactsModel from "../../models/contacts.js";

const router = express.Router();

const contactSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email(),
	phone: Joi.string().required(),
	favorite: Joi.boolean(),
});

router.get("/", async (req, res, next) => {
	try {
		const contacts = await contactsModel.listContacts();
		res.json(contacts);
	} catch (error) {
		next(error);
	}
});

router.get("/:contactId", async (req, res, next) => {
	try {
		const contactId = req.params.contactId;
		const contact = await contactsModel.getContactById(contactId);

		if (contact) {
			res.json(contact);
		} else {
			res.status(404).json({ message: "Not found" });
		}
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const { error } = contactSchema.validate(req.body);

		if (error) {
			res.status(400).json({ message: error.details[0].message });
			return;
		}

		const newContact = await contactsModel.addContact(req.body);
		res.status(201).json(newContact);
	} catch (error) {
		next(error);
	}
});

router.delete("/:contactId", async (req, res, next) => {
	try {
		const contactId = req.params.contactId;
		const contact = await contactsModel.getContactById(contactId);

		if (contact) {
			await contactsModel.removeContact(contactId);
			res.json({ message: "Contact deleted" });
		} else {
			res.status(404).json({ message: "Not found" });
		}
	} catch (error) {
		next(error);
	}
});

router.put("/:contactId", async (req, res, next) => {
	try {
		const { error } = contactSchema.validate(req.body);

		if (error) {
			res.status(400).json({ message: error.details[0].message });
			return;
		}

		const contactId = req.params.contactId;
		const updatedContact = await contactsModel.updateContact(
			contactId,
			req.body
		);

		if (updatedContact) {
			res.json(updatedContact);
		} else {
			res.status(404).json({ message: "Not found" });
		}
	} catch (error) {
		next(error);
	}
});

router.patch("/:contactId/favorite", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const { favorite } = req.body;

		if (favorite === undefined) {
			res.status(400).json({ message: "missing field favorite" });
			return;
		}

		const updatedContact = await contactsModel.updateStatusContact(contactId, {
			favorite,
		});

		res.json(updatedContact);
	} catch (error) {
		if (error.message === "missing field favorite") {
			res.status(400).json({ message: error.message });
		} else if (error.message === "Not found") {
			res.status(404).json({ message: error.message });
		} else {
			next(error);
		}
	}
});

export default router;
