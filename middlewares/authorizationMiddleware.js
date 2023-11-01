const requestError = require('../helpers/requestError');
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const { JWT_SECRET } = process.env;

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.split(" ")[1];
    try {
        if (!token) {
            next(requestError(401, "Not authorized"))
        }
        const {id} = jwt.verify(token, JWT_SECRET)
        const user = await User.findById(id);
        if (!user || !user.token || user.token !== token) {
            next(requestError(401, "Not authorized"));
        }
        req.user = user;
        
    } catch (error) {
        next(requestError(401, "Not authorized"))
    }
    next()
}

module.exports = auth