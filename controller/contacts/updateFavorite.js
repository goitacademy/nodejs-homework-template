const createError = require('http-errors');
const { Contact } = require("../../models/contact");
const { schemas } = require("../../schemas/schemas");

const updateFavorite = async (req, res, next) => {
    const { contactId } = req.params;
    if (!req.body) 
    throw createError(404, 'missing field favorite');
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
    });
    if (!result) throw createError(404, "Not found");
    res.status(201).json(result);
};

module.exports = updateFavorite;