const { Contact } = require('../../models');

const createError = require('http-errors');

const updateFavorite = async (req, res) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true, });
    if (!result) {
        throw createError(404, `Product with ID=${contactId} not found`);
    }
    res.json({
        status: "success",
        code: 200,
        data: { result },
    });
};

module.exports = updateFavorite;