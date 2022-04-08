const {Router}=require('express');
const { serializerUserResponse } = require('../auth/auth.serializers');
const { authorize } = require('../middlewares/authorize.middleware');
const { getCurrentUser } = require('./users.service');
const userRouter = Router();

userRouter.get('/current', authorize(), async(req,res, next) => {

    const user = await getCurrentUser(req.userId)
    res.status(200).send(serializerUserResponse(user))
}) 

exports.userRouter=userRouter