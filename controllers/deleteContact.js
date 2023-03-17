const {Contact} = require('./../models/contactModel');

const deleteContact = async (req, res) => {
    try {
        const { contactId } = req.params;
        await Contact.findByIdAndDelete({_id: contactId})
        res.status(200).json(`Contact ${contactId} deleted`);
    } catch (err) {
        res.status(404).json('Not found');
    }
};

module.exports = {
    deleteContact,
};