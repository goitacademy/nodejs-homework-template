const { schema } = require('../helpers/validations');
const {Contact} = require('./../models/contactModel');

const updateContactById = async (req, res) => {
    try {
        const validationResult = schema.validate(req.body);
        if(validationResult.error) {
            return res.status(400).json("missing fields");
        }

        const { contactId } = req.params;
        const { name, email, phone, favorite } = req.body;
        const contactUpdate = await Contact.findByIdAndUpdate({_id: contactId}, {name, email, phone, favorite}, { new: true })
        res.status(200).json(contactUpdate);
    } catch (err) {
        res.status(404).json('Not found');
    }
};

module.exports = {
    updateContactById,
};

