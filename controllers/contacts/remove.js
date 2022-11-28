const {Contact} = require('../../models/contact');
const {HttpError} = require("../../helpers");

const remove = async (req, res, next) => {
    try {
        const {contactId} = req.params;
        const result = await Contact.findByIdAndRemove(contactId);
        if (!result) {
            throw HttpError(404);
        }
        res.json({"message": "contact deleted"});
    } catch (error) {
        next(error)
    }
}

module.exports = remove;