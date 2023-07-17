const {HttpError} = require("../helpers");

const validateFavoriteStatus = (req, res, next) => {
    if(Object.keys(req.body).length === 0){
        next(HttpError(400, "missing field favorite"));
    }
    
    next();
};

module.exports = validateFavoriteStatus;
