const service = require("../service/index");

const getContacts = async (_, res, next) => {
	try {
		const result = await service.getContactList();
		console.log(result);
		res.json({
			status: "success",
			code: 200,
			data: {
				contacts: result,
			},
		});
	} catch (e) {
		console.error(e);
		next(e);
	}
};

const getContactById = async (req, res, next) => {
	const { contactId } = req.params;

	try {
		const result = await service.getContactById(contactId);
		if (result) {
			res.json({
				status: "success",
				code: 200,
				data: { contact: result },
			});
		} else {
			res.status(404).json({
				status: "error",
				code: 404,
				message: `Not found contact with id: ${contactId}`,
				data: "Not Found",
			});
		}
	} catch (e) {
		console.error(e);
		next(e);
	}
};

const addContact = async (req, res, next) => {
	const { name, phone, email } = req.body;
	try {
		const result = await service.addContact({ name, phone, email });
		if (result) {
			res.status(201).json({
				status: "success",
				code: 201,
				data: { contact: result },
			});
		} else {
			res.status(400).json({
				status: "error",
				code: 400,
				message: `missing required name - field`,
				data: "Not Found",
			});
		}
	} catch (e) {
		console.error(e);
		next(e);
	}
};

const removeContact = async (req, res, next) => {
	const { contactId } = req.params;
	try {
		const result = await service.removeContact(contactId);
		if (result) {
			res.json({
				status: "success",
				code: 200,
				data: { contact: result },
			});
		} else {
			res.status(404).json({
				status: "error",
				code: 404,
				message: `Not found contact id: ${contactId}`,
				data: "Not Found",
			});
		}
	} catch (e) {
		console.error(e);
		next(e);
	}
};

const updateContact = async (req, res, next) => {
	const { name, phone, email } = req.body;
	const { contactId } = req.params;
	try {
		const result = await service.updateContact({ name, phone, email }, { contactId });
		if (result) {
			res.json({
				status: "success",
				code: 200,
				data: { contact: result },
			});
		} else {
			res.status(404).json({
				status: "error",
				code: 404,
				message: `Not found contact with id: ${contactId}`,
				data: "Not Found",
			});
		}
	} catch (e) {
		console.error(e);
		next(e);
	}
};

const updateFavorite = async (req, res, next) => {
	const { contactId } = req.params;
	const { favorite } = req.body;
	console.log(favorite);
	try {
		const result = await service.isFavorite(contactId, { favorite });
		console.log(result);
		if (result && favorite !== undefined) {
			res.json({
				status: "success",
				code: 200,
				data: { contact: result },
			});
		} else {
			res.status(400).json({
				status: "error",
				code: 400,
				message: `missing field favorite`,
				data: "Not Found",
			});
		}
	} catch (e) {
		console.error(e);
		next(e);
	}
};

module.exports = {
	getContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
	updateFavorite,
};
