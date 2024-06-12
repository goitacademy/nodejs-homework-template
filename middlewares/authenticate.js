const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const SECRET_KEY= "9uUg6HcyXDW7WexDWFMrsm7XVXNsIcPS";


const authenticate = async (req, res, next) => {
    const { authorization = " " } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if(bearer !== "Bearer") {
        return res.status(401).json({"message": "Not authorized"});
    };
    try {
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if(!user || !user.token) {
            return res.status(401).json({"message": "Not authorized"});
        }
        else {
        req.user = user;
        next();
        }
    }
    catch(error) {
        return res.status(401).json({"message": "Not authorized"});
    };
};

module.exports = authenticate;