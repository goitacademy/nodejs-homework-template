const {Contact} = require('../db/schema')

const getAllContacts = async (req, res) => {
	const getContacts = await Contact.find({});
	res.status(200).json(getContacts);
}

module.exports = {
  getAllContacts
}