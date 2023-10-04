const {HttpError} = require('../helpers')

const authenticate = async (req, res, next) =>{
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");
    if(bearer !== "Bearer"){
        next(HttpError(401))

    }

}

module.exports = authenticate;