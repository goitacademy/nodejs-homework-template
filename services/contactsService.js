const Contact = require('../models/contact');
const contactRepository = require('../repositories/contactsRepository');

class ContactsService {
  constructor(contactRepository) {
    this.contactRepository = contactRepository;
  }

  async getAll() {
    return await this.contactRepository.getContacts();
  }

  async getOneById(id) {
    return await this.contactRepository.findOneById(id);
  }

  async remove(id) {
    return await this.contactRepository.removeContact(id);
  }

  async add(payload) {
    const contact = new Contact(payload);
    return await this.contactRepository.addContact(contact);
  }

  async updateById(id, payload) {
    return await this.contactRepository.updateContact(id, payload);
  }

}

const contactsService = new ContactsService(contactRepository);

module.exports = contactsService;