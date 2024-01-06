// import dotenv from "dotenv"

import { HttpError } from "../helpers/index.js";

import controllerWrapper from "../decorators/controllerWrapper.js";
import Contact from "../models/contacts.js";

// dotenv.config()

const getAll = async (req, res) => {
	const { _id: owner } = req.user;
	const { page = 1, limit = 20, favorite } = req.query;
	const skip = (page - 1) * limit;
	const query = { owner };

	if (favorite !== undefined) {
		query.favorite = favorite === "true";
	}

	const result = await Contact.find(query, "-createdAt -updatedAt", { skip, limit }).populate("owner", "email subscribtion");
	res.json(result);
};

const getContactById = async (req, res) => {
	const {_id: owner} = req.user
	const { contactId } = req.params;
	const result = await Contact.findOne({_id: contactId, owner});
	if (!result) {
		throw HttpError(404, "Not found");
	}

	res.json(result);
};

const addContact = async (req, res) => {
	const {_id: owner} = req.user
	const result = await Contact.create({...req.body, owner});
	res.status(201).json(result);
};

const deleteContact = async (req, res) => {
	const {_id: owner} = req.user
	const { contactId } = req.params;
	const result = await Contact.findOneAndDelete({_id: contactId, owner});
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.status(200).json({
		message: "contact deleted",
	});
};

const updateContactById = async (req, res) => {
	const {_id: owner} = req.user
	const { contactId } = req.params;
	const result = await Contact.findOneAndUpdate({_id: contactId, owner}, req.body);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
};


export default {
	getAll: controllerWrapper(getAll),
	getContactById: controllerWrapper(getContactById),
	addContact: controllerWrapper(addContact),
	deleteContact: controllerWrapper(deleteContact),
	updateContactById: controllerWrapper(updateContactById),
};
