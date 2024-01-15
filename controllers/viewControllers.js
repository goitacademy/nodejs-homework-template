const contacts = require("../models/contactsModel");
const { catchAsync } = require("../utils");

exports.home = (req, res) => {
	res.status(200).render('home', {
		active: 'home',
		title: 'Home page'
	});
}

exports.todos = catchAsync(async (req, res) => {
	const contact = await contacts.find().populate('owner')

	res.status(200).render('todos', {
		active: 'todos',
		title: 'Todos list',
		todos: contact
	});
})