const {Contact} = require('../../models/contact')

const getContacts = async (req, res) => {
   const { _id } = req.user;
   const contacts = await Contact.find({ owner: _id });
   res.status(200).json(contacts);
};

module.exports = getContacts;