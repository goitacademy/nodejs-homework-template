const { HttpError } = require('../../helpers');
const Contact = require("../../models/contact")

const getAll = async (req, res, next) => {
	try {
		const contacts = await Contact.find();

		res.json(contacts);
	} catch (error) {
		next(error);
	}
};

const add = async (req, res) => {
	try {
		const result = await Contact.create(req.body)
		res.status(201).json(result)
	}
	catch (error) {
		next(error)
	}
};

const getById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const contact = await Contact.findById(id);

		if (!contact) throw HttpError(404, `Not found`)
		res.json(contact);
	}
	catch (error) {
		next(error);
	}
};

const updById = async (req, res, next) => {
	try {
		const { name, email, phone } = req.body;
		if (!name && !email && !phone) throw HttpError(400, "missing fields")

		const { id } = req.params;
		const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true, })

		if (!contact) throw HttpError(404, `Not found`)
		res.json(contact);
	}
	catch (error) {
		next(error);
	}
};

// const deleteById = async (req, res, next) => {
// 	try {
// 		const { id } = req.params;

// 		const contact = await contactsService.removeContact(id)
// 		if (!contact) throw HttpError(404, `Not found`)
// 		res.json({ "message": "contact deleted" });
// 	}
// 	catch (error) {
// 		next(error)
// 	}
// };


module.exports = {
	getAll,
	add,
	getById,
	// deleteById,
	updById,
};