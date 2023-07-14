import express from "express";
import Joi from "joi";
import contactsService from "../../models/contacts.js";
import HtppError from "../../helpers/HttpError.js";

const contactsRouter = express.Router();
const contactAddSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.number().required(),
});

contactsRouter.get("/", async (_, res, next) => {
	try {
		const result = await contactsService.listContacts();
		res.json(result);
	} catch (error) {
		next(error);
	}
});

contactsRouter.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await contactsService.getContactById(id);
		if (!result) {
			throw HtppError(404, `Contact with id=${id} not found`);
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
});

contactsRouter.post("/", async (req, res, next) => {
	try {
		const { error } = contactAddSchema.validate(req.body);
		console.log(error);
		if (error) {
			throw HtppError(400, error.message);
		}
		const result = await contactsService.addContact(req.body);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
});

contactsRouter.delete("/:id", async (req, res, next) => {
	res.json({ message: "template message" });
});

contactsRouter.put("/:id", async (req, res, next) => {
	res.json({ message: "template message" });
});
export default contactsRouter;
