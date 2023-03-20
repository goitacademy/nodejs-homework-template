const { schema } = require('../helpers/validations');
const { catchAsync } = require('../helpers/catchAsync');
const { updateContact } = require('../models/contacts');

const updateContactById = catchAsync(async (req, res) => {
        const validationResult = schema.validate(req.body);
        if(validationResult.error) {
            return res.status(400).json("missing fields");
        }
        const { contactId } = req.params;
        const { name, email, phone, favorite} = req.body;
        const contactUpdate = await updateContact({_id: contactId}, {name, email, phone, favorite}, { new: true })
        res.status(200).json(contactUpdate);
});

module.exports = {
    updateContactById,
};

