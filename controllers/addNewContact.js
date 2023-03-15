const { schema } = require('../helpers/validations');
const { addContact } = require('../models/contacts')

const addNewContact = async (req, res) => {
    try {
        const {error} = schema.validate(req.body);
        if(error) {
            return res.status(400).json({error});
        }

        const { name, email, phone } = req.body;
        const newContacts = await addContact({name, email, phone,});

        res.status(201).json(newContacts);
    } catch (err) {
        res.status(404).json('Not found');
    }
};

module.exports = {
    addNewContact,
};