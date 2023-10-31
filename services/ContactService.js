const Contact = require('../models/Contact');

class ContactService {
  async getAll(filter = {}, options = {}) {
    const allContacts = await Contact.find(
      filter,
      'name email phone favorite',
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
    const { _id, name, email, phone, favorite } = await Contact.create(body);
    return { _id, name, email, phone, favorite };
  }

  async updateContact(id, body = {}) {
    const updated = await Contact.findByIdAndUpdate(id, body, {
      new: true,
      projection: 'name email phone favorite',
    });
    return updated;
  }
}

const contactService = new ContactService();

module.exports = contactService;
