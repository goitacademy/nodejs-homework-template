const contactModel = require("../models/contactsModel")
const contactSchema = require("../validation/contactValidationSchema")

async function getContacts(req, res, next) {
	try {
		const userId = req.user.id
		if (userId === undefined) {
			return res.status(401).send("Login or register to get contacts!")
		}

		const contacts = await contactModel.find({ ownerId: userId }).exec()
		return res.send(contacts)
	} catch (error) {
		next(error);
	}
}

async function getContactById(req, res, next) {
	try {
		const contact = await contactModel.findById(req.params.id).exec()

		if (contact === null) {
			return res.status(404).send({ message: "Contact is not found!" });
		}

		if (contact.ownerId !== req.user.id) {
			return res.status(403).send({ message: "You don't have permission to get this book!" });
			// OR
			// return res.status(404).send({ message: "Book is not found!" })
		}

		return res.status(200).send(contact)
	} catch (error) {
		next(error)
	}
}

async function addContact(req, res, next) {
	const { name, email, phone } = req.body

	const { error } = contactSchema.validate(req.body);
	if (error) {
		console.error(error);
		return res.status(400).send({ message: "Missing required field(s)!" });
	}

	try {
		const newContact = { name, email, phone }

		const contact = await contactModel.create(newContact)

		res.status(201).send(contact)
	} catch (error) {
		next(error)
	}
}

async function updateContact(req, res, next) {
	const { name, email, phone } = req.body
	const response = await contactSchema.validate(req.body);
	if (typeof response.error !== "undefined") {
		return res.status(400).json({ message: "Missing required field(s)!" });
	}

	try {
		const newContact = { name, email, phone }

		const result = await contactModel.findByIdAndUpdate(req.params.id, newContact, { new: true }).exec()
		if (result === null) {
			return res.status(404).send({ message: "Contact is not found!" });
		}

		if (result.ownerId !== req.user.id) {
			return res.status(403).send({ message: "You don't have permission to update this book!" });
			// OR
			// return res.status(404).send({ message: "Book is not found!" })
		}

		return res.send(result)
	} catch (error) {
		next(error)
	}
}

async function updateContactField(req, res, next) {
	try {
		if (!Object.keys(req.body).includes('favorite')) {
			return res.status(400).send({ message: "Missing field - favorite!" });
		}
		const result = await contactModel.findByIdAndUpdate(
			req.params.id,
			{ $set: { favorite: req.body.favorite } },
			{ new: true }
		).exec()

		if (result.ownerId !== req.user.id) {
			return res.status(403).send({ message: "You don't have permission to update this book!" });
			// OR
			// return res.status(404).send({ message: "Book is not found!" })
		}

		return res.send(result)
	} catch (error) {
		next(error)
	}
}

async function removeContact(req, res, next) {
	try {
		const result = await contactModel.findByIdAndRemove(req.params.id).exec()

		if (result === null) {
			return res.status(404).send({ message: "Contact is not found!" });
		}

		if (result.ownerId !== req.user.id) {
			return res.status(403).send({ message: "You don't have permission to delete this book!" });
			// OR
			// return res.status(404).send({ message: "Book is not found!" })
		}

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
	updateContactField
}
