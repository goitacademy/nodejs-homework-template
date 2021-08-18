const Contacts = require('../model/contacts.model');
const ErrorException = require('../exceptions/error.exception');

class ContactsController {
	async getAll(req, res, next) {
		try {
			const contacts = await Contacts.listContacts();
			return res.json(contacts);
		} catch (e) {
			next(e);
		}
	}

	async getById(req, res, next) {
		try {
			const {contactId} = req.params;
			const contact = await Contacts.getContactById(contactId);
			if (contact) {
				return res.json(contact);
			}
			return next(ErrorException.NotFound());
		} catch (e) {
			next(e);
		}
	}

	async remove(req, res, next) {
		try {
			const {contactId} = req.params;
			const contact = await Contacts.removeContact(contactId);
			if (contact) {
				return res.json(contact);
			}
			return next(ErrorException.NotFound());
		} catch (e) {
			next(e);
		}
	}

	async update(req, res, next) {
		try {
			const {contactId} = req.params;
			const contact = await Contacts.updateContact(contactId, req.body);
			if (contact) {
				return res.json(contact);
			}
			return next(ErrorException.NotFound());
		} catch (e) {
			next(e);
		}
	}

	async create(req, res, next) {
		try {
			const contact = await Contacts.addContact(req.body);
			return res.status(201).json(contact);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new ContactsController();
