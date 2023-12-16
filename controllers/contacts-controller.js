import { HttpError } from '../helpers/index.js'

import controllerWrapper from '../decorators/controllerWrapper.js';
import Contact from '../models/contacts.js';

const getAll = async (req, res) => {
		const result = await Contact.find()
		res.json(result)
};

const getContactById = async (req, res) => {
		const { contactId } = req.params;
		const result = await Contact.findById(contactId);
		if (!result) {
			throw HttpError(404, "Not found");
		}

		res.json(result)
};

const addContact = async (req, res) => {

		const result = await Contact.create(req.body);
		res.status(201).json(result);
};

const deleteContact = async (req, res) => {
		const { contactId } = req.params;
		const result = await Contact.findByIdAndDelete(contactId)
		if (!result) {
			throw HttpError(404, "Not found");
		}
		res.status(200).json({
			message: "contact deleted",
		});
};

const updateContactById = async (req, res) => {

		const { contactId } = req.params;
		const result = await Contact.findByIdAndUpdate(contactId, req.body);
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
