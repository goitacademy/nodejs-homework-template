const path = require('node:path');
const fs = require('node:fs/promises');

class ContactsRepository {
  contactsPath = path.resolve(__dirname, "..", "db", "contacts.json");

async getContacts() {
  const data = await fs.readFile(this.contactsPath);
  return JSON.parse(data);
};

async findOneById(contactId) {
  const contacts = await this.getContacts();
  const res = contacts.find(({ id }) => id === contactId);
  return res || null;
};

async removeContact(contactId) {
  const contacts = await this.getContacts(); 
  const res = contacts.find(({ id }) => id === contactId);
  res
    && await fs.writeFile(
      this.contactsPath,
      JSON.stringify(contacts.filter(({ id }) => id !== contactId), null, 2)
    );
  return res || null;
};

async addContact({id, name, email, phone}) {
  const contacts = await this.getContacts();
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(this.contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
  };
  
  async updateContact(contactId, body) {
    const contacts = await this.getContacts()
    const data = contacts.map(e => e.id === contactId ? { ...e, ...body } : e)
    await fs.writeFile(this.contactsPath, JSON.stringify(data, null, 2))
  }
}

const contactRepository = new ContactsRepository();

module.exports = contactRepository;