const express = require("express");
const { tryCatchWrapper } = require("../../helpers/index");
const { auth } = require("../../middlewares/index");

const { createContact, getContacts, getCurrentUser, updateAvatar } = require("../../controllers/user.controller");
const userRouter = express.Router();

userRouter.post('/contacts',tryCatchWrapper(auth),  tryCatchWrapper(createContact));
userRouter.get('/contacts', tryCatchWrapper(auth), tryCatchWrapper(getContacts));
userRouter.get('/current', tryCatchWrapper(auth), tryCatchWrapper(getCurrentUser));
userRouter.post('/avatars', tryCatchWrapper(auth), tryCatchWrapper(updateAvatar));


module.exports ={
    userRouter,
}


