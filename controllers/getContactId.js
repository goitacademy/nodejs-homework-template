const { getContactById } = require('../models/contacts')

const getContactId = async (req, res) => {
    try {
        const { contactId } = req.params;
        const contacts = await getContactById(contactId);
        res.status(200).json(contacts);
    } catch (err) {
        res.status(404).json('Not found');
    }
};

module.exports = {
    getContactId,
};
