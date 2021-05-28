const { ContactsReporitory } = require("../repository");
const db = require("../db");

class ContactsService {
  constructor() {
    process.nextTick(async () => {
      const client = await db;

      this.repositories = {
        contacts: new ContactsReporitory(client),
      };
    });
  }

  listContacts() {
    const data = this.repositories.contacts.listContacts();
    return data;
  }

  getContactById(contactId) {
    const data = this.repositories.contacts.getContactById(contactId);
    return data;
  }

  addContact(body) {
    const data = this.repositories.contacts.addContact(body);
    return data;
  }

  removeContact(contactId) {
    const data = this.repositories.contacts.removeContact(contactId);
    return data;
  }

  updateContact(contactId, body) {
    const data = this.repositories.contacts.updateContact(contactId, body);
    return data;
  }

  updateStatusContact(contactId, body) {
    const data = this.repositories.contacts.updateStatusContact(
      contactId,
      body
    );
    return data;
  }
}

module.exports = { ContactsService };
