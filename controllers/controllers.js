const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises');

const { listContacts, addContact, removeContact, updateContact, getContactById } = require("../models/contacts");
const { catchAsync, userValidator, HttpError } = require('../utils');


exports.getUsers = catchAsync(async (req, res, next) => {
	const contacts = await listContacts();

	res.status(200).json({
		contacts,
	})
})


exports.getUser = catchAsync(async (req, res, next) => {
	const { contactId } = req.params;
	const contact = await getContactById(contactId);

	res.status(200).json({
		contact,
	})
}
)


exports.newUser = catchAsync(async (req, res) => {
	const { value, error } = userValidator.createUserDataValidator(req.body);
	if (error) throw new HttpError(400, `${error.message}`);

	const { name, email, phone } = value;
	if (!name || !email || !phone) throw new HttpError(400, "missing required name field");
	const newUser = {
		id: uuidv4(),
		name,
		email,
		phone,
	};

	const newContact = await addContact(newUser);
	await fs.writeFile('./models/contacts.json', JSON.stringify(newContact));

	res.status(201).json({
		mes: 'Success',
		newUser,
	})
})


exports.deleteUser = catchAsync(async (req, res) => {

	const { contactId } = req.params;
	const { contacts } = await removeContact(contactId);


	fs.writeFile('./models/contacts.json', JSON.stringify(contacts), err => {
		if (err) HttpError(400, 'Invalid user data');
	});

	return res.status(200).json({
		"message": "contact deleted"
	});
})


exports.removeUser = catchAsync(async (req, res) => {
	const { value, error } = userValidator.createUserDataValidator(req.body);

	if (error) throw new HttpError(400, error.message);

	const { name, email, phone } = value;
	const { contactId } = req.params;
	if (!name || !email || !phone) throw new HttpError(400, "missing required name field");

	const newUser = {
		id: uuidv4(),
		name,
		email,
		phone,
	};

	const contacts = await updateContact(contactId, newUser);
	await fs.writeFile('./models/contacts.json', JSON.stringify(contacts));

	res.status(200).json({
		mes: 'Success',
		newUser,
	})

})