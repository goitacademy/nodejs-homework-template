const contactsOperation = require('../../models/contacts');

const getAll = async (req, res) => {
    try {
        const allContacts = await contactsOperation.listContacts();

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
