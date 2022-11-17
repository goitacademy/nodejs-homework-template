const express = require('express')
<<<<<<< Updated upstream
const routerUser = express.Router()
const { tryCatchWrapper } = require('./contacts')
const { auth } = require('./../../models/auth')

const userController = require('../../models/user')

routerUser.get('/', tryCatchWrapper(auth), tryCatchWrapper(userController.getUsers))

routerUser.post('/signup', tryCatchWrapper(userController.signUpUser))

routerUser.post('/login', tryCatchWrapper(userController.loginUser))

routerUser.get('/logout', tryCatchWrapper(userController.logoutUser))

routerUser.get('/current', tryCatchWrapper(auth), tryCatchWrapper(userController.currentUser))


module.exports = {
    routerUser,
}
=======
const userRouter = express.Router()

const userController = require('../../models/user')

function tryCatchWrapper(endpointFn) {
    return async (req, res, next) => {
        try {
            await endpointFn(req, res, next);
        } catch (err) {
            next(err);
        }
    };
}


userRouter.post('/', tryCatchWrapper(userController.signUp))

module.exports = userRouter


>>>>>>> Stashed changes
