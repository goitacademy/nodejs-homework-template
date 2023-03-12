const contactsModel = require('../../models/contact')

const getContacts = async (req, res) => {
    const contacts = await contactsModel.listContacts();
    res.status(200).json(contacts);
}

module.exports = {getContacts};