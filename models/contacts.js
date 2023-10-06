const fs = require('fs/promises');
const {nanoid} = require("nanoid");

const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");

const readFile = async() => {
	const text = await fs.readFile("./contacts.json", "utf-8");
	console.log(text);
};

const writeFile = async() => {
	const result = await fs.writeFile("./contacts.json");
	console.log(result);
};

 // Возвращает массив контактов
const listContacts = async () => {
	const data = await fs.readFile(contactsPath);
	return JSON.parse(data);
  }

  // Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден
  const getContactById = async (id) => {
	const contactId = String(id);
	const contacts = await listContacts();
	const result = contacts.find(item => item.id === contactId);
	return result || null;
  }

  // Певертає новий контакт
	const addContact = async (data) => {
		const contacts = await listContacts();
		const newContact = {
			id: nanoid(),
			...data,
		}
		contacts.push(newContact);
		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
		return newContact;
	}

// Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
	const removeContact = async (id) => {
		const contactId = String(id);
		const contacts = await listContacts();
		const index = contacts.findIndex(item => item.id === contactId);
		if (index === -1) {
			return null;
		}
		const [result] = contacts.splice(index, 1);
		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
		return result;
		}

// Оновлення записів

	const updateContact = async (id, data) => {
		const contactId = String(id);
		const contacts = await listContacts();
		const index = contacts.findIndex(item => item.id === contactId);
		if (index === -1) {
			return null;
		}
		contacts[index] = {contactId, ...data};
		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
		return contacts[index];
	}

module.exports = {
  writeFile,
	readFile,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
