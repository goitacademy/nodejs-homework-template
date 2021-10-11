
const contactsOperations = require("../../model/contacts");
const { contactSchema } = require("../../validation");

const update = async (req, res, next) => {
    const { error } = contactSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: 'missing fields' })
    }
    const { contactId } = req.params
    try {
        const updateContact = await contactsOperations.update(
            contactId,
            req.body
        )
        if (!updateContact) {
            return res.status(404).json({
                message: 'Not found',
            })
        }
        res.json({ updateContact })
    } catch (error) {
        next(error)
    }
}

module.exports = update;