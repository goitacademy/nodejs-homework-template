const Contact = require('../../models/contacts/schemaContact');

const addContact = async(req, res, next) => {
    try {
        const { body } = req;
        const contact = await Contact.create({...body });
        res
            .status(201)
            .json({ status: 'success', code: 201, payload: { contact } });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports = addContact;