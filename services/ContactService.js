const Contact = require('../models/Contact');

class ContactService {
  async getAll() {
    const allContacts = await Contact.find({});
    return allContacts;
  }

  async getContactById(id) {
    const contact = await Contact.findById(id);

    return contact;
  }

  async removeContact(id) {
    const removed = await Contact.findByIdAndRemove(id);

    return removed;
  }

  async addContact(body = {}) {
    const contact = Contact.create(body);

    return contact;
  }

  async updateContact(id, body = {}) {
    const updated = Contact.findByIdAndUpdate(id, body, { new: true });

    return updated;
  }
}

const contactService = new ContactService();

module.exports = contactService;
