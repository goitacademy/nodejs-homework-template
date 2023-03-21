const {Contact} = require('../../models');
const createError = require("http-errors");


const updateStatusContact = async (req, res, next) => {
    try {
        const {contactId} = req.params;
        const {favorite} = req.body;
        const result = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true});
        console.log("patch");
        if (!result) {
            throw createError(404, "Not found");
        }
        res.status(200).json(
            result
        );
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = updateStatusContact;