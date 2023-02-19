const {listContacts} = require('../models/contacts')

const getAllContacts = async (req, res) => {
	const getContacts = await listContacts ()
	res.status(200).json(getContacts);
}

module.exports = {
  getAllContacts
}