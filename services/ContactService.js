const Contact = require('../models/Contact');

class ContactService {
  async getAll(...args) {
    const [filter = {}, projection = {}, options = {}] = args;
    const allContacts = await Contact.find(
      filter,
      projection,
      options
    ).populate('owner', 'name email');
    return allContacts;
  }

  async getContactById(id) {
    const contact = await Contact.findById(id, 'name email phone favorite');

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
