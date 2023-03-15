const { listContacts } = require('../models/contacts')

const getContactsList = async (req, res) => {
    try {
        const contacts = await listContacts();
        res.status(200).json(contacts);
    } catch (err) {
        res.status(400).json({msg: err.msg,});
    }
};

module.exports = {
    getContactsList,
};
