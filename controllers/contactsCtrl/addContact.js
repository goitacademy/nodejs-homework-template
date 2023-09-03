const { Contact,JoiSchema} = require('../../models/contacts');
const{ HttpError} = require('../../helpers');

const addContact = async (req, res) => {

    const { error } = JoiSchema.validate(req.body);
    if (error) {
        throw HttpError(400,error.message)
    };

    const result = await Contact.create(req.body);
    res.status(201).json(result) 
};

module.exports = addContact;