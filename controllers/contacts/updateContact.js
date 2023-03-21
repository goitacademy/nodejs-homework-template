const createError = require("http-errors");
const {Contact} = require('../../models');


const updateContact = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
        if (!result) {
            throw createError(404, "Not found");
        }
        res.status(200).json(
            result
        );
    } catch (error) {
        next(error);
    }
}

module.exports = updateContact;