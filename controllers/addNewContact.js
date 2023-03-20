const { schema } = require('../helpers/validations');
const { catchAsync } = require('../helpers/catchAsync');
const { addContact } = require('../models/contacts');

const addNewContact = catchAsync(async (req, res) => {
        const {error} = schema.validate(req.body);
        if(error) {
            return res.status(400).json({error});
        }
        const { name, email, phone, favorite } = req.body;
        const newContact = await addContact({name, email, phone, favorite});

        res.status(201).json(newContact);
});

module.exports = {
    addNewContact,
};