const Database = require("./DatabaseManager");

class ContactsManager {
  constructor() {
    this.Database = new Database("contacts.json");
  }

  listContacts = async () => {
    return await this.Database.fetchData();
  };

  getById = async (contactId) => {
    const contactsList = await this.listContacts();
    const idx = contactsList.findIndex((contact) => contact.id === contactId);
    if (idx === -1) return -1;
    return contactsList.splice(idx, 1);
  };

  removeContact = async (contactId) => {
    const deletedContact = await this.Database.deleteDataById(contactId);
    if (deletedContact === -1) return -1;
    return 1;
  };

  addContact = async (body) => {
    return await this.Database.addData(body);
  };

  updateContact = async (contactId, body) => {
    return await this.Database.updateDataById(contactId, body);
  };
}

module.exports = new ContactsManager();
