const path = require('node:path')
const fs = require('node:fs/promises')
const Contact = require('../models/contact')

class ContactsRepository {
	async findAll(config) {
		const { page, limit, favorite } = config
		const skip = (page - 1) * limit

		const contactsQuery = Contact.find()
			.where('deletedAt')
			.equals(null)
			.skip(skip)
			.limit(limit)

		const countQuery = Contact.countDocuments().where('deletedAt').equals(null)

		if (favorite) {
			contactsQuery.where('favorite').equals(favorite)
			countQuery.where('favorite').equals(favorite)
		}

		const contacts = await contactsQuery.exec()
		const count = await countQuery.exec()

		return { contacts, count }
	}

	async findOneById(contactId) {
		const contact = await Contact.findById(contactId)
			.where('deletedAt')
			.equals(null)
		return contact
	}

	async create(payload) {
		const contact = new Contact(payload)
		await contact.save()

		return contact
	}

	async updateById(contactId, payload) {
		const contact = await this.findOneById(contactId)
		if (!contact) {
			return
		}

		const updatedContact = await Contact.findByIdAndUpdate(contactId, payload, {
			returnOriginal: false,
		})
		return updatedContact
	}

	async updateStatusContact(contactId, payload) {
		await Contact.findByIdAndUpdate(contactId, payload)
		const contact = await this.findOneById(contactId)
		return contact
	}

	async deleteById(contactId) {
		const contact = await this.findOneById(contactId)
		if (!contact) {
			return
		}

		await Contact.findByIdAndUpdate(contactId, {
			$set: {
				deletedAt: new Date(),
			},
		})
		return contactId
	}
}

const contactRepository = new ContactsRepository()

module.exports = contactRepository
