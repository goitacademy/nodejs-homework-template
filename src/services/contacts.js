const { ContactsReporitory } = require("../repository");

class ContactsService {
  constructor() {
    this.repositories = {
      contacts: new ContactsReporitory(),
    };
  }

  listContacts() {
    const data = this.repositories.contacts.listContacts();
    console.log(data);
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
}

module.exports = { ContactsService };
