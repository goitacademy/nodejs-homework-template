const { contactServise } = require('../servises');
const { catchAsync } = require('../utils');


const listContacts = catchAsync(async (req, res) => {
	const { contacts, total } = await contactServise.listContactsinDataBase(req.user, req.query);
	res.status(200).json({
		contacts,
		total,
		user: req.user,
	})
});


const addContact = catchAsync(async (req, res) => {

	const contact = await contactServise.addContact(req.body, req.user);

	res.status(201).json(
		contact,
	)
})


const getContactById = catchAsync(async (req, res) => {
	const { contactId } = req.params;

	const contact = await contactServise.getContactByIdinDataBase(contactId, req.user);

	res.status(200).json(
		contact,
	)
});


const removeContact = catchAsync(async (req, res) => {

	const { contactId } = req.params;
	await contactServise.removeContact(contactId, req.user);


	return res.status(200).json({
		"message": "contact deleted"
	});
})



const updateContact = catchAsync(async (req, res) => {
	const { contactId } = req.params;
	const update = req.body;

	const contact = await contactServise.updateContact(contactId, update, req.user);
	res.status(200).json(
		contact,
	)
})


const updateContactFavorite = catchAsync(async (req, res) => {
	const { contactId } = req.params;
	const { favorite } = req.body;

	const updateFavorite = await contactServise.updateContactFavorite(contactId, favorite, req.user);

	res.status(200).json(
		updateFavorite,
	)
})


module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
	updateContactFavorite,
}