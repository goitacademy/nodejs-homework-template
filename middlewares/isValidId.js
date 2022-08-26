const {isValidObjectId} = require("mongoose");
const { RequestErr } = require("../helpers/RequestErr");

const isValidId = (req, _, next) => {
    const {id} = req.params;
    const correctId = isValidObjectId(id);
    if(!correctId){
        const error = RequestErr(400, `${id} is not correct`);
        next(error);
    }
    next();
};

module.exports = isValidId;