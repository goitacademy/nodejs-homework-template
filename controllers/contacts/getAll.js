const Contact = require('../../models/contactModel');

const getAll = async (req, res) => {
    try {
        const allContacts = await Contact.find();

        res.status(200).json({
            result: allContacts,
        });
    } catch (error) {
        res.status(500).json({
            msg: error.msg,
        });
    }
};

module.exports = getAll;
