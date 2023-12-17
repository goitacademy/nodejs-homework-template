const createError = require('http-errors');
const { Contact } = require("../../models/contact");
const { schemas } = require("../../schemas/schemas");

const updateFavorite = async (req, res, next) => {
    try {
        const { error } = schemas.updateFavoriteSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }
        const { contactId } = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body, {
            new: true,
        });
        if (!result) {
            throw createError(404, 'missing field favorite');
        }
        res.json({
            status: 'success',
            code: 200,
            data: {
                result,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = updateFavorite;