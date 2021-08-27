const data = require('../../contactsData');
const { contactSchema } = require('../../validation');

const updateContact = async (req, res, next) => {
    try {     
        const { error } = contactSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.message       
            })
        }

        const { contactId } = req.params;
        const updateContact = await data.updateContact(contactId, req.body);

        if (!updateContact) {
            return res.status(404).json({
                "message": "Not found"
            })
        }

        res.status(200).json({
            updateContact
        })
    }
    catch (error) {
        next(error);
    }
}

module.exports = updateContact
