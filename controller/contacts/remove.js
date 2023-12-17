const createError = require('http-errors');
const { Contact } = require('../../models/contact');

const remove = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndDelete(contactId);
        if (!result) {
            throw createError(404, `Contact with id=${contactId} not found`);
        }
        res.json({
           message:"contact deleted",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = remove;