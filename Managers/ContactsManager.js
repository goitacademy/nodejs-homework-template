const { getting } = require("./responses/responseMessages");

const Database = require("./DatabaseManager");

class ContactsManager {
  constructor() {
    this.DataBase = new Database("contacts.json");
  }

  listContacts = async () => {
    return await this.DataBase.fetchData();
  };

  getContactById = async (contactId) => {
    const contactsList = await this.listContacts();
    const idx = contactsList.findIndex((contact) => contact.id === contactId);
    if (idx === -1) return JSON.stringify(getting.error);
    return contactsList.splice(idx, 1);
  };

  removeContact = async (contactId) => {
    return await this.DataBase.deleteDataById(contactId);
  };

  addContact = async (body) => {};

  updateContact = async (contactId, body) => {};
}

const contacts = new ContactsManager();

const list = async () => await contacts.removeContact("drsAJ4SHPYqZeG-83QTVW");

(async () => {
  try {
    const result = await list();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
})();

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
