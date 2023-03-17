const { schema } = require('../helpers/validations');
const {Contact} = require('./../models/contactModel');

const addNewContact = async (req, res) => {
    try {
        const {error} = schema.validate(req.body);
        if(error) {
            return res.status(400).json({error});
        }

        const { name, email, phone, favorite } = req.body;
        const newContact = await Contact.create({name, email, phone, favorite});
        await newContact.save(); 

        res.status(201).json(newContact);
    } catch (err) {
        res.status(404).json('Not found');
    }
};

module.exports = {
    addNewContact,
};