const {Contact} = require('../../models');

const createError = require("http-errors");

const getById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await Contact.findById(id);
        // console.log(result)

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

module.exports = getById;