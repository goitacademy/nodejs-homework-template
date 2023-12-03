const HttpError = require('../common/models/HttpError');
const contactRepository = require('../repositories/contactsRepository');

class ContactsService {
	constructor(contactRepository) {
		this.contactRepository = contactRepository;
	}

	async getAll(config) {
		return await this.contactRepository.findAll(config);
	}

	async getOneById(id) {
		const contact = await this.contactRepository.findOneById(id);
		if (!contact) {
			throw new HttpError(404, 'Contact is not found');
		}
		return contact;
	}

	async create(payload) {
		return await this.contactRepository.create(payload);
	}

	async deleteById(id) {
		const contact = await this.contactRepository.deleteById(id);
		if (!contact) {
			throw new HttpError(404, 'Contact is not found');
		}
		return { id };
	}

	async updateById(id, payload) {
		const contact = await this.contactRepository.updateById(id, payload);
		if (!contact) {
			throw new HttpError(404, 'Contact is not found');
		}
		return contact;
	}

	async updateStatusContact(id, payload) {
		const contact = await this.contactRepository.updateStatusContact(
			id,
			payload
		);
		if (!contact) {
			throw new HttpError(404, 'Contact is not found');
		}
		return contact;
	}
}

const contactsService = new ContactsService(contactRepository);

module.exports = contactsService;
