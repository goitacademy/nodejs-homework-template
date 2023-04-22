const { NotFound } = require('http-errors');
const Contact = require('../../models/contact');

const removeContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndRemove(contactId);
        if (!result) {
            throw new NotFound(`Not found`);
        }
        res.json({ message: 'contact deleted' });
    } catch (error) {
        next(error);
    }
};

module.exports = removeContact;
