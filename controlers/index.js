const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;
const contactsJson = "./controlers/contacts.json";
const service = require("../service/index");

const getContacts = async (_, res, next) => {
	try {
		const result = await service.getContactList();
		console.log(result);
		res.json({
			status: "success",
			code: 200,
			data: {
				contact: result,
			},
		});
	} catch (e) {
		console.error(e);
		next(e);
	}
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
		const removedContact = parsedData.filter((user) => user.id === contactId);
		const contactListAfterRemove = parsedData.filter((user) => user.id !== contactId);
		fs.writeFile(contactsJson, JSON.stringify(contactListAfterRemove));
		return removedContact;
	});
};

const addContact = async (body) => {
	return fs.readFile(contactsJson).then((data) => {
		const parsedData = JSON.parse(data);
		const contactWithId = { ...body, id: uuidv4() };
		parsedData.push(contactWithId);
		return fs
			.writeFile(contactsJson, JSON.stringify(parsedData))
			.then(() => {
				console.log(`Added user ${contactWithId.name}`);

				return contactWithId;
			})
			.catch((err) => {
				console.log("Append Failed: " + err);
			});
	});
};

const updateContact = async (contactId, body) => {
	return fs.readFile(contactsJson).then((data) => {
		const parsedData = JSON.parse(data);
		const doesIdExist = parsedData.find((el) => el.id === contactId);
		if (doesIdExist) {
			const [contact] = parsedData.filter((el) => el.id === contactId);
			contact.name = body.name;
			contact.email = body.email;
			contact.phone = body.phone;
			console.log(contact);
			console.table(parsedData);
			fs.writeFile(contactsJson, JSON.stringify(parsedData));
			return contact;
		} else if (!doesIdExist) {
			const contactWithId = { ...body, id: uuidv4() };
			parsedData.push(contactWithId);
			return fs
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
	getContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
