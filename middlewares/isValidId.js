const { isValidObjectId } = require("mongoose");

const isValidId = (req, _, next) => {
    const { id } = req.params;
    const isCorrectId = isValidObjectId(id);
    if (!isCorrectId) {
        const error = new Error(`id=${id} is not correct id format`);
        error.status = 400;
        throw error;
    };
    next();
};

module.exports = isValidId;