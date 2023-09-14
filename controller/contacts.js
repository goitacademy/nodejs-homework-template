const {
	getAllContacts,
	getContactById,
	createContact,
	updateContact,
	removeContact,
	updateStatusContact,
} = require("../services/index");

const get = async (req, res, next) => {
	try {
		const results = await getAllContacts();
		res.status(200).json(results);
	} catch (e) {
		console.error(e);
		next(e);
	}
};

const getById = async (req, res, next) => {
	const { id } = req.params;
	try {
		const result = await getContactById(id);
		if (result) {
			return res.status(200).json(await result);
		} else {
			return res
				.status(404)
				.json({ message: `Not found contact id: ${id}` });
		}
	} catch (e) {
		console.error(e);
		next(e);
	}
};

const create = async (req, res, next) => {
	const { name, email, phone } = req.body;
	try {
		const newContact = await createContact({ name, email, phone });
		res.status(201).json(newContact);
	} catch (e) {
		console.error(e);
		next(e);
	}
};

const update = async (req, res, next) => {
	const { id } = req.params;
	const { name, email, phone } = req.body;
	try {
		const editedContact = await updateContact(id, { name, email, phone });
		if (editedContact) {
			res.status(200).json(editedContact);
		} else {
			return res
				.status(404)
				.json({ message: `Not found contact id: ${id}` });
		}
	} catch (e) {
		console.error(e);
		next(e);
	}
};

const updateStatus = async (req, res, next) => {
	const { id } = req.params;
	const { favorite } = req.body;

	try {
		const updatedStatus = await updateStatusContact(id, { favorite });
		if (updatedStatus) {
			return res.status(200).json(updatedStatus);
		} else {
			res.status(404).json({ message: "Not found" });
		}
	} catch (e) {
		console.error(e);
		next(e);
	}
};

const remove = async (req, res, next) => {
	const { id } = req.params;
	try {
		const contact = await removeContact(id);
		if (contact) {
			return res.status(200).json({ message: "contact deleted" });
		} else {
			return res
				.status(404)
				.json({ message: `Not found contact id: ${id}` });
		}
	} catch (e) {
		console.error(e);
		next(e);
	}
};

module.exports = {
	get,
	getById,
	create,
	update,
	updateStatus,
	remove,
};
