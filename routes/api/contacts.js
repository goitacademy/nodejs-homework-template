const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");
// const { HttpError } = require("../../helpers");

// const contactSchema = require("../../schemas/contact");

// const contacts = require("../../models/contacts");

// router.get("/", async (req, res, next) => {
// 	const result = await contacts.listContacts();
// 	res.status(200).json(result);
// });
router.get("/", ctrl.listContacts);

// router.get("/:contactId", async (req, res, next) => {
// 	try {
// 		const result = await contacts.getContactById(req.params.contactId);
// 		if (!result) {
// 			throw HttpError(404, "Not Found");
// 		}
// 		res.status(200).json(result);
// 	} catch (error) {
// 		next(error);
// 	}
// });
router.get("/:contactId", ctrl.getContactById);

// router.post("/", async (req, res, next) => {
// 	try {
// 		const { error } = contactSchema.validate(req.body);
// 		if (error) {
// 			throw HttpError(400, error.details[0].message);
// 		}
// 		const result = await contacts.addContact(req.body);
// 		res.status(201).json(result);
// 	} catch (error) {
// 		next(error);
// 	}
// });

router.post("/", ctrl.addContact);

// router.delete("/:contactId", async (req, res, next) => {
// 	try {
// 		const result = await contacts.removeContact(req.params.contactId);
// 		if (!result) {
// 			throw HttpError(404, "Not Found");
// 		}
// 		res.json(result);
// 	} catch (error) {
// 		next(error);
// 	}
// });

router.delete("/:contactId", ctrl.removeContact);

// router.put("/:contactId", async (req, res, next) => {
// 	try {
// 		const result = await contacts.updateContact(req.params.contactId, req.body);
// 		if (!result) {
// 			throw HttpError(404, "Not Found");
// 		}
// 		res.status(200).json(result);
// 	} catch (error) {
// 		next(error);
// 	}
// });

router.put("/:contactId", ctrl.updateContact);

module.exports = router;
