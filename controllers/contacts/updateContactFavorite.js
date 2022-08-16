const createError = require('http-errors');
const { contact: service } = require("../../service");

const updateContactFavorite = async (req, res) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await service.updateContactFavorite(contactId, { favorite });
    if (!result) {
        throw createError(400, "missing field favorite");
    };
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    });
};

module.exports = updateContactFavorite;
