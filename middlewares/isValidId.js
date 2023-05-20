const {isValidObject} = require("mongoose");
const {HttpErrors} = require("../helpers");

const isValidId = (req, res, next) => {
    const {id} = req.params;
    if(isValidObject(id)) {
        Erorr = new HttpErrors(400, `${id} is not valid id`);
        next(Erorr.getError);
    }
} 

module.exports = isValidId;