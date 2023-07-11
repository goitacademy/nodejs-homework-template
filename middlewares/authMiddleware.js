
const jwt = require('jsonwebtoken');
require('dotenv').config('./.env');
const User = require('../models/users/users');

const authenticate = async (req, res, next) => {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer' || !token) {
         res.status(401).json({
            message: "Not authorized header"
        })
    }
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const item = await User.findById(id);
        req.user = item;
        if (!item || !item.token || (item.token !== token)) {
             res.status(401).json({
                message: "Not authorized token"
            });
        }
        next();
    }
    catch (err) {
        res.status(500).json({ message: "Ooops... AuthMidErr"});
    }
}




module.exports = authenticate