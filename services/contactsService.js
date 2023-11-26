const HttpError = require('../common/HttpError');
const Contact = require('../models/contact');
const contactRepository = require('../repositories/contactsRepository');

class ContactsService {
  constructor(contactRepository) {
    this.contactRepository = contactRepository;
  }

  async getAll() {
    return await this.contactRepository.findAll();
  }

  async getOneById(id) {
    const contact = await this.contactRepository.findOneById(id);
    if (!contact) {
      throw new HttpError(404, 'Contact is not found');
    }
    return contact;
  }

    async create(payload) {
    const contact = new Contact(payload);
    return await this.contactRepository.create(contact);
  }

  async deleteById(id) {
    return await this.contactRepository.deleteById(id);
  }

  async updateById(id, payload) {
    return await this.contactRepository.updateById(id, payload);
  }
}

const contactsService = new ContactsService(contactRepository);

module.exports = contactsService;