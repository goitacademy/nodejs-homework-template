const { isValidObjectId } = require("mongoose");
const {HttpErorr} =require("../helpers")

const isValidId = (req, res, next) => {
    const { id } = req.params;
    if (isValidObjectId(id)) {
    next(HttpErorr(400, `${id} is not valid id`));
    }
    next()
}

module.exports = isValidId;