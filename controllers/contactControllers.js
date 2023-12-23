const { contactServise } = require('../servises');
const { catchAsync } = require('../utils');


const listContacts = catchAsync(async (req, res, next) => {
	const contacts = await contactServise.listContactsinDataBase();
	res.status(200).json({
		contacts,
	})
});


const getContactById = catchAsync(async (req, res) => {
	const { contactId } = req.params;

	const contact = await contactServise.getContactByIdinDataBase(contactId);

	res.status(200).json({
		contact,
	})
});


const removeContact = catchAsync(async (req, res) => {

	const { contactId } = req.params;
	await contactServise.removeContact(contactId);


	return res.status(200).json({
		"message": "contact deleted"
	});
})


const addContact = catchAsync(async (req, res) => {

	const newContact = await contactServise.addContact(req.body);

	res.status(201).json({
		mes: 'Success',
		newContact,
	})
})


const updateContact = catchAsync(async (req, res) => {
	const { contactId } = req.params;
	const update = req.body;

	const updatedUser = await contactServise.updateContact(contactId, update);
	res.status(200).json({
		mes: 'Success',
		updatedUser,
	})
})

const updateContactFavorite = catchAsync(async (req, res) => {
	const { contactId } = req.params;
	const { favorite } = req.body;

	const updateFavorite = await contactServise.updateContactFavorite(contactId, favorite);

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