const express = require("express");
const { tryCatchWrapper } = require("../../helpers/index");
const { auth } = require("../../middlewares/index");

const { createContact, getContacts, getCurrentUser } = require("../../controllers/user.controller");

const userRouter = express.Router();

userRouter.post('/contacts',tryCatchWrapper(auth),  tryCatchWrapper(createContact));
userRouter.get('/contacts', tryCatchWrapper(auth), tryCatchWrapper(getContacts));
userRouter.get('/me', tryCatchWrapper(auth), tryCatchWrapper(getCurrentUser));


module.exports ={
    userRouter,
}


