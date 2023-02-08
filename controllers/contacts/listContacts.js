const contactsOperations = require('../../models');

const listContacts = async (req, res, next) => {
    const contacts = await contactsOperations.listContacts();
        res.json({
            status: "success",
            code: 200,
            data: {
                result: contacts,
            },
        });
}

module.exports = listContacts;