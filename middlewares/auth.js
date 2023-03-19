const {User} = require('../models/auth')
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = process.env

const auth = async(req, res, next) => {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    if(bearer !== 'Bearer'){
        return res
            .status(401)
            .json({ status: "Unauthorized",
                code: 401,
                message: "Not authorized"
            });
    }
    try{
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if(!user || !user.token){
            return res
                .status(401)
                .json({ status: "Unauthorized",
                    code: 401,
                    message: "Not authorized"
                });
        }
        req.user = user;
        next()
    }catch (e) {
        if(e.message === 'Invalid signature'){
            e.status(401)
        }
        next(e)
    }
}

module.exports = auth;