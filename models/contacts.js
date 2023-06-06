// const fs = require('fs/promises')
const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;
const contactsJson = "./models/contacts.json";

const listContacts = async () => {
	return fs.readFile(contactsJson).then((data) => JSON.parse(data));
};

const getContactById = async (contactId) => {
	return fs.readFile(contactsJson).then((data) => {
		const parsedData = JSON.parse(data);
		const user = parsedData.filter((users) => users.id === contactId);
		return user;
	});
};

const removeContact = async (contactId) => {
	return fs.readFile(contactsJson).then((data) => {
		const parsedData = JSON.parse(data);
		const removeContact = parsedData.filter((user) => user.id !== contactId);
		return fs.writeFile(contactsJson, JSON.stringify(removeContact));
	});
};

const addContact = async (body) => {
	fs.readFile(contactsJson).then((data) => {
		const parsedData = JSON.parse(data);
		const contactWithId = { ...body, id: uuidv4() };
		parsedData.push(contactWithId);
		fs
			.writeFile(contactsJson, JSON.stringify(parsedData))
			.then(() => {
				console.log(`Added user ${contactWithId.name}`);
				console.table(parsedData);
			})
			.catch((err) => {
				console.log("Append Failed: " + err);
			});
	});
};

const updateContact = async (contactId, body) => {
	fs.readFile(contactsJson).then((data) => {
		const parsedData = JSON.parse(data);
		const doesIdExist = parsedData.find((el) => el.id === contactId);
		if (doesIdExist) {
			const [contact] = parsedData.filter((el) => el.id === contactId);
			contact.name = body.name;
			contact.email = body.email;
			contact.phone = body.phone;
			console.log(contact);
			console.table(parsedData);
			return fs.writeFile(contactsJson, JSON.stringify(parsedData));
		} else if (!doesIdExist) {
			const contactWithId = { ...body, id: uuidv4() };
			parsedData.push(contactWithId);
			fs
				.writeFile(contactsJson, JSON.stringify(parsedData))
				.then(() => {
					console.log(`Added user ${contactWithId.name}`);
					console.table(parsedData);
				})
				.catch((err) => {
					console.log("Append Failed: " + err);
				});
		}
	});
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
