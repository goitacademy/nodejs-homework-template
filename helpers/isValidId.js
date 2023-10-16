const { isValidObjectId } = require('mongoose');
const {HttpErr} = require('./HttpErr')

const isValidId = (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        next(HttpErr(400, `${id} is not valid id`))
    }
    next();
};

module.exports = {
    isValidId,
}