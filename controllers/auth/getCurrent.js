const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;


const getCurrent = (req, res) => { 
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
     if (bearer !== "Bearer") {
    next(HttpError(401));
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        
     } catch {
        
      }
    

}

module.exports = getCurrent