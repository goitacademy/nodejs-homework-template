const { HttpError } = require('../helpers');
const jwt = require('jsonwebtoken')
const { User } = require('../models/user')

const { SECRET_KEY } = process.env;


const authenticate = async (req, res, next) => {
    console.log('виконується мідлвара аутентифікації')
            console.log('Секрет_кей:', SECRET_KEY)


    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (bearer !== "Bearer") {

        next(HttpError(401, "Not authorized"))
    }
    try {
        console.log('виконується трай')
        console.log('Секрет_кей:', SECRET_KEY)


        const { id } = jwt.verify(token, SECRET_KEY);
        console.log('розшифрувалось')

        const user = await User.findById(id)
        if (!user || !user.token
            // || user.token === token
        ) {
            next(HttpError(401, "Not authorized"))
        }
        req.user = user;
        next()
    } catch (error){
        console.log(error)
        next(HttpError(401, "Not authorized"))
    }
}

module.exports = authenticate