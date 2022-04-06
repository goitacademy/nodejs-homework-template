const {Router} = require('express');
const { singUp, signIn } = require('./auth.service');
const { addUserValid,addUserValidSignIn } = require('./auth.schemas');
const { serializerUserResponse } = require('./auth.serializers');

const authRouter = Router();

authRouter.post('/signup', addUserValid, async (req, res, next) => {
    // 1. validate req body +
    // 2. check if user with such email exists +
    // 3. if exists - throw 409 error +
    // 4. hash provided password +
    // 5. save user to Db +
    // 6. send successful response +
    const user = await singUp(req.body);
    res.status(201).send(serializerUserResponse(user))
})

authRouter.post('/login', addUserValidSignIn, async(req, res, next)=>{
    // 1. validate req.body +
    // 2. find user with such email +
    // 3. if user was not found -send 404 error  +
    // 4. compare passwords +
    // 5. if passwords were not equil - send 403 error +
    // 6. generate JWT token +
    // 7. send succesful respons

    const {user, token} = await signIn(req.body);
    res.status(200).send(serializerUserResponse(user,token))
})

exports.authRouter = authRouter;

