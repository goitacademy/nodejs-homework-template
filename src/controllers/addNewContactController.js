const {Contact} = require('../db/schema')

const addNewContact = async (req, res) => {
	const { name, email, phone, favorite } = req.body;
	const newContact = new Contact({name, email, phone, favorite})
	await newContact.save()
	res.status(201).json({ message: "new contact added" });
}

module.exports = {
  addNewContact
}