const {Contact} = require('./../models/contactModel');

const getContactId = async (req, res) => {
    try {
        const { contactId } = req.params;
        const contacts = await Contact.findById({_id: contactId});
        res.status(200).json(contacts);
    } catch (err) {
        res.status(404).json('Not found');
    }
};

module.exports = {
    getContactId,
};
