const jwt = require('jsonwebtoken');


const {User} = require('../models/user');
require('dotenv').config();
const {SECRET_KEY} = process.env;
const {RequestError} = require('../heplers')
const authenticate = async(req, res, next) => {

try{
    const {authorization = ''} = req.headers;
    const [bearer = '', token = ''] = authorization.split(' ')
    if(bearer !== 'Bearer'){
        throw RequestError(401)
    }

    try{
        const {id} = jwt.verify(token, SECRET_KEY)
        const user = await User.findById(id);
       
        if (!user || !user.token) {
            throw Error('Unauthorized')
        }
        req.user = user;
        next()
    }

    catch(error){
        throw RequestError(401, error.message)
    }




}
catch (error){
 next(error)
}


   
}

module.exports = authenticate

