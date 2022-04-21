const { Contact } = require('../../models/contact');
const createError = require('http-errors');

const removeContact = async(req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Contact.findByIdAndDelete(id);
        if (!result) {
            throw new createError(404, 'Not found');
        }
        res.json({ message: 'Contact deleted' });
    } catch (error) {
        next(error)
    }
};

module.exports = removeContact;