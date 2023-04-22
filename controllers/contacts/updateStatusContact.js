const { NotFound } = require('http-errors');
const Contact = require('../../models/contact');

const updateStatusContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body, {
            new: true,
        });

        if (!result) {
            throw new NotFound('Not found');
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = updateStatusContact;
