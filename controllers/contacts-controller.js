import * as contactServive from "../models/contacts.js";

import { HttpError } from '../helpers/index.js'

import controllerWrapper from '../decorators/controllerWrapper.js';

const getAll = async (req, res) => {
		const result = await contactServive.listContacts();
		res.json(result);
};

const getContactById = async (req, res) => {
		const { contactId } = req.params;
		const result = await contactServive.getContactById(contactId);
		if (!result) {
			throw HttpError(404, "Not found");
		}

		res.json(result).status(200);
};

const addContact = async (req, res) => {

		const result = await contactServive.addContact(req.body);
		res.status(201).json(result);
};

const deleteContact = async (req, res) => {
		const { contactId } = req.params;
		const result = await contactServive.deleteContact(contactId);
		if (!result) {
			throw HttpError(404, "Not found");
		}
		res.status(200).json({
			message: "contact deleted",
		});
};

const updateContactById = async (req, res) => {

		const { contactId } = req.params;
		const result = await contactServive.updateContact(contactId, req.body);
		if (!result) {
			throw HttpError(400, "Not found");
		}
		res.status(200).json(result);
};

export default {
	getAll: controllerWrapper(getAll),
	getContactById: controllerWrapper(getContactById),
	addContact: controllerWrapper(addContact),
	deleteContact: controllerWrapper(deleteContact),
	updateContactById: controllerWrapper(updateContactById),
};
