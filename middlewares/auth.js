const User = require('./../models/users');
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
    // console.log(req.headers)
    const {authorization = ""} = req.headers;
    // const { authorization = "" } = req.headers;
    // console.log(`Authorisation!!${authorization}`)
    const [bearer, token] = authorization.split(" ");
   
    try {
         if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized")  
    }
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token) {
            throw new Unauthorized("Not authorized"); 
        }
        req.user = user;
        // console.log(`User!! ${user}`)
        // console.log(`REQ_USER!!${req.user}`)
        next();
     }
    catch(error) {
        if (error.message === "Invalid signature") {
            error.status = 401;
        }
        next(error);
    }
}
module.exports = auth