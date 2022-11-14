const { Contacts } = require("./contactSchema");

const listContacts = async () => {
	const contacts = await Contacts.find({});
	return contacts;
};

// const getContactById = async (contactId) => {
// 	const data = await listContacts();
// 	const [getById] = data.filter((it) => it.id === contactId);
// 	return getById;
// };

// const removeContact = async (contactId) => {
// 	const data = await listContacts();
// 	let removedContact;
// 	const updatedContacts = data.filter((item) => {
// 		if (item.id === contactId) {
// 			removedContact = item;
// 		}
// 		return item.id !== contactId;
// 	});
// 	await fs.writeFile(contactsDB, JSON.stringify(updatedContacts));
// 	return removedContact;
// };

// const addContact = async (body) => {
// 	const { email, name, phone } = body;

// 	const data = await listContacts();
// 	const newContact = { name, email, phone, id: uuid() };
// 	data.push(newContact);
// 	await fs.writeFile(contactsDB, JSON.stringify(data));
// 	return newContact;
// };

// const updateContact = async (contactId, body) => {
// 	const data = await listContacts();
// 	const contacts = data.map((elem) => {
// 		if (elem.id === contactId) {
// 			return { ...elem, ...body };
// 		} else {
// 			return elem;
// 		}
// 	});
// 	const changedContact = contacts.find((elem) => elem.id === contactId);
// 	await fs.writeFile(contactsDB, JSON.stringify(contacts));
// 	return changedContact;
// };

module.exports = {
	listContacts,
	// getContactById,
	// removeContact,
	// addContact,
	// updateContact,
};
