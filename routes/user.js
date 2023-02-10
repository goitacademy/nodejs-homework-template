const express = require('express');

const { tryCatchWrapper } = require('../helpers/index');

const {
    current,
    logout,
    updateSubscription,
} = require("../controllers/index");

const { updateSubscriptionSchema, auth } = require("../middlewares/index");

const userRouter = express.Router();

userRouter.get("/current", tryCatchWrapper(auth), tryCatchWrapper(current));

userRouter.patch(
    "/",
    tryCatchWrapper(updateSubscriptionSchema),
    tryCatchWrapper(updateSubscription)
);

userRouter.post("/logout", tryCatchWrapper(auth), tryCatchWrapper(logout));

module.exports = {userRouter,};