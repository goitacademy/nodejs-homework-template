const Contacts = require('../models/contactsModel');
const { catchAsync } = require('../utils');


const listContacts = catchAsync(async (req, res, next) => {
	const contacts = await Contacts.find();
	res.status(200).json({
		contacts,
	})
});


const getContactById = catchAsync(async (req, res) => {
	const { contactId } = req.params;
	const contact = await Contacts.findById(contactId);

	res.status(200).json({
		contact,
	})
});


const removeContact = catchAsync(async (req, res) => {

	const { contactId } = req.params;
	await Contacts.findByIdAndDelete(contactId);


	return res.status(200).json({
		"message": "contact deleted"
	});
})


const addContact = catchAsync(async (req, res) => {

	const newContact = await Contacts.create(req.body);

	res.status(201).json({
		mes: 'Success',
		newContact,
	})
})


const updateContact = catchAsync(async (req, res) => {
	const { contactId } = req.params;
	const { name, email, phone, favorite, role } = req.body;

	const updatedUser = await Contacts.findByIdAndUpdate(contactId, { name, email, phone, favorite, role }, { new: true });


	res.status(200).json({
		mes: 'Success',
		updatedUser,
	})
})

const updateContactFavorite = catchAsync(async (req, res) => {
	const { contactId } = req.params;
	const { favorite } = req.body;

	console.log(favorite);

	const updateFavorite = await Contacts.findByIdAndUpdate(contactId, { favorite }, { new: true });

	res.status(200).json({
		mes: 'Success',
		updateFavorite,
	})
})


module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
	updateContactFavorite,
}