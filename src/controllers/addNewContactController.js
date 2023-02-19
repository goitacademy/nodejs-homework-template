const {addContact} = require('../models/contacts')

const addNewContact = async (req, res) => {
	const { name, email, phone, favorite = false } = req.body;
	await addContact ({name, email, phone, favorite})
	res.status(201).json({ message: "new contact added" });
}

module.exports = {
  addNewContact
}