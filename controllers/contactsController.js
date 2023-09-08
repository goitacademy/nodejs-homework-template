const contactModel = require("../models/contactsModel")
const contactSchema = require("../validation/contactValidationSchema")

async function getContacts(req, res, next) {
	const userId = req.user.id
	if (userId === undefined) {
		return res.status(401).send("Login or register to get contacts!")
	}

	try {
		const contacts = await contactModel.find({ ownerId: userId }).exec()
		return res.send(contacts)
	} catch (error) {
		next(error);
	}
}

async function getContactById(req, res, next) {
	const contact = await contactModel.findById(req.params.id).exec()

	if (!contact) {
		return res.status(404).send({ message: "Contact is not found!" });
	}

	if (contact.ownerId.toString() !== req.user.id) {
		return res.status(403).send({ message: "You don't have permission to get this contact!" });
		// OR
		// return res.status(404).send({ message: "Contact is not found!" })
	}

	try {
		return res.status(200).send(contact)
	} catch (error) {
		next(error)
	}
}

async function addContact(req, res, next) {
	const ownerId = req.user.id;
	const { name, email, phone, favorite } = req.body

	const { error } = contactSchema.validate(req.body);
	if (error) {
		console.error(error);
		return res.status(400).send({ message: "Missing required field(s)!" });
	}

	const existingPhoneContact = await contactModel.findOne({ phone, ownerId });
	if (existingPhoneContact) {
		return res.status(400).send({ message: "Contact with this phone number already exists!" });
	}

	try {
		const newContact = { name, email, phone, favorite, ownerId }

		const contact = await contactModel.create(newContact)

		res.status(201).send(contact)
	} catch (error) {
		next(error)
	}
}

async function updateContact(req, res, next) {
	const { name, email, phone } = req.body
	const { error } = contactSchema.validate(req.body);
	if (error) {
		console.error(error);
		return res.status(400).send({ message: "Missing required field(s)!" });
	}

	const contact = await contactModel.findById(req.params.id).exec()

	if (!contact) {
		return res.status(404).send({ message: "Contact is not found!" });
	}

	if (contact.ownerId.toString() !== req.user.id) {
		return res.status(403).send({ message: "You don't have permission to update this contact!" });
		// OR
		// return res.status(404).send({ message: "Contact is not found!" })
	}

	try {
		const newContact = { name, email, phone }
		const result = await contactModel.findByIdAndUpdate(req.params.id, newContact, { new: true }).exec()

		return res.send(result)
	} catch (error) {
		next(error)
	}
}

async function updateFavoriteField(req, res, next) {
	if (!Object.keys(req.body).includes('favorite')) {
		return res.status(400).send({ message: "Missing field - favorite!" });
	}
	const contact = await contactModel.findById(req.params.id).exec()

	if (!contact) {
		return res.status(404).send({ message: "Contact is not found!" });
	}

	if (contact.ownerId.toString() !== req.user.id) {
		return res.status(403).send({ message: "You don't have permission to update this contact!" });
		// OR
		// return res.status(404).send({ message: "Contact is not found!" })
	}

	try {
		const result = await contactModel.findByIdAndUpdate(req.params.id, { $set: { favorite: req.body.favorite } }, { new: true }).exec()

		return res.send(result)
	} catch (error) {
		next(error)
	}
}

async function removeContact(req, res, next) {
	const contact = await contactModel.findById(req.params.id).exec()

	if (contact === null) {
		return res.status(404).send({ message: "Contact is not found!" });
	}

	if (contact.ownerId.toString() !== req.user.id) {
		return res.status(403).send({ message: "You don't have permission to delete this contact!" });
		// OR
		// return res.status(404).send({ message: "Contact is not found!" })
	}

	try {
		const result = await contactModel.findByIdAndRemove(req.params.id).exec()
		return res.send(result)
	} catch (error) {
		next(error)
	}
}


module.exports = {
	getContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
	updateFavoriteField
}
