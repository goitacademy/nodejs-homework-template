import express from "express";
import contactsService from "../../models/contacts.js";
import HttpError from "../../helpers/HttpError.js";
import Joi from "joi";

const contactsRouter = express.Router();

const contactAddSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
});

contactsRouter.get("/", async (req, res, next) => {
	try {
		const result = await contactsService.listContacts();
		res.json(result);
	} catch (error) {
		next(error);
	}
});

contactsRouter.get("/:contactId", async (req, res, next) => {
	try {
		const result = await contactsService.getContactById(req.params.contactId);
		if (!result) {
			throw HttpError(404, "Not found");
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
});

contactsRouter.post("/", async (req, res, next) => {
	try {
		const { error } = contactAddSchema.validate(req.body);
		if (error) {
			throw HttpError(400, "missing required name field");
		}
		const result = await contactsService.addContact(req.body);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
});

contactsRouter.put("/:contactId", async (req, res, next) => {
	try {
		const { error } = contactAddSchema.validate(req.body);
		if (error) {
			throw HttpError(400, "missing fields");
		}
		const result = await contactsService.updateContact(req.params.contactId, req.body);
		if (!result) {
			throw HttpError(404, "Not found");
		}
		res.status(200).json(result);
	} catch (error) {}
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
	try {
		const result = await contactsService.removeContact(req.params.contactId);
		if (!result) {
			throw HttpError(404, "Not found");
		}
		throw HttpError(200, "contact deleted");
	} catch (error) {
		next(error);
	}
});

export default contactsRouter;
