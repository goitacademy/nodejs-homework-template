const jwt = require('jsonwebtoken');
require('dotenv').config();
const {HttpError} = require('../helpers');
const {SECRET_KEY} = process.env;
const {User} = require('../models');


const authenticate = async (req, res, next) => {
    const {authorization = ''} = req.headers;
    const [bearer, token] = authorization.split(' ');
    
    if(bearer !== 'Bearer'){
        next(new HttpError(401, 'Not authorized'))
    };

    try {
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        
        if(!user || !user.token || user.token !== token){
            next(new HttpError(401, 'Not authorized'))
        }

        req.user = user;
        next();
    } catch(error) {
        next(new HttpError(401, 'Not authorized'))
    }
};

module.exports = authenticate;