const contactService = require("../services/contacts.service");

const get = async (req, res, next) => {
	try {
		const results = await contactService.getAll();
		res.json({
			status: "success",
			code: 200,
			results: results.length,
			data: {
				contacts: results,
			},
		});
	} catch (error) {
		console.error("Error reading file: ", error.message);
		next(error);
	}
};

const getById = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contact = await contactService.getById(contactId);
		if (contact) {
			res.json({
				status: "success",
				code: 200,
				data: {
					contact,
				},
			});
		} else {
			res.status(404).json({
				status: "fail",
				message: "Not found",
			});
		}
	} catch (error) {
		next(error);
	}
};

const create = async (req, res, next) => {
	try {
		const { body } = req;

		const newContact = await contactService.create(body);

		res.json({
			status: "success",
			code: 201,
			data: {
				newContact,
			},
		});
	} catch (error) {
		next(error);
	}
};

const update = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const { body } = req;
		const updateData = await contactService.update(contactId, body);

		res.json({
			status: "success",
			code: 200,
			data: {
				updateData,
			},
		});
	} catch (error) {
		if (error.message === "Contact not found") {
			res.status(404).json({
				status: "fail",
				message: "Not found",
			});
		} else {
			next(error);
		}
	}
};
const updateFavorite = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const { favorite } = req.body;

		if (typeof favorite !== "boolean") {
			return res.status(404).json({
				status: "fail",
				message: "Missing field favorite",
			});
		}

		const updateData = await contactService.updateFavorite(contactId, { favorite });

		res.json({
			status: "success",
			code: 200,
			data: {
				updateData,
			},
		});
	} catch (error) {
		if (error.message === "Contact not found") {
			res.status(404).json({
				status: "fail",
				message: "Not found",
			});
		} else {
			next(error);
		}
	}
};

const remove = async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contact = await contactService.remove(contactId);
		if (contact) {
			res.json({
				status: "success",
				code: 200,
				message: "contact deleted",
				data: {
					contact,
				},
			});
		} else {
			res.status(404).json({
				status: "fail",
				message: "Not found",
			});
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	get,
	getById,
	create,
	update,
	updateFavorite,
	remove,
};
