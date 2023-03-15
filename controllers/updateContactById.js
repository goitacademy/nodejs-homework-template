const { schema } = require('../helpers/validations');
const { updateContact } = require('../models/contacts')

const updateContactById = async (req, res) => {
    try {
        const validationResult = schema.validate(req.body);
        if(validationResult.error) {
            return res.status(400).json("missing fields");
        }

        const { contactId } = req.params;
        const { name, email, phone } = req.body;
        const contacts = await updateContact(contactId, {name, email, phone,});
        res.status(200).json(contacts);
    } catch (err) {
        res.status(404).json('Not found');
    }
};

module.exports = {
    updateContactById,
};

