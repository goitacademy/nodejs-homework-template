
const { catchAsync } = require('../utils');
const Contacts = require('../models/contactsModel');


exports.getUsers = catchAsync(async (req, res, next) => {
	const contacts = await Contacts.find();
	res.status(200).json({
		contacts,
	})
})


exports.getUser = catchAsync(async (req, res) => {
	const { contactId } = req.params;
	const contact = await Contacts.findById(contactId);

	res.status(200).json({
		contact,
	})
}
)


exports.newUser = catchAsync(async (req, res) => {

	const newContact = await Contacts.create(req.body);

	res.status(201).json({
		mes: 'Success',
		newContact,
	})
})


exports.deleteUser = catchAsync(async (req, res) => {

	const { contactId } = req.params;
	const delContact = await Contacts.findByIdAndDelete(contactId);


	return res.status(200).json({
		"message": "contact deleted",
		delContact,
	});
})


exports.updateUser = catchAsync(async (req, res) => {
	const { contactId } = req.params;
	const { name, email, phone, favorite, role } = req.body;

	const updatedUser = await Contacts.findByIdAndUpdate(contactId, { name, email, phone, favorite, role }, { new: true });


	res.status(200).json({
		mes: 'Success',
		updatedUser,
	})

})