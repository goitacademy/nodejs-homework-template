const express = require("express");
const { tryCatchWrapper, validateBody } = require("../../helpers/error-func");
const { signupUser, loginUser, logoutUser, currentUser, updateUser, uploadImage } = require("../../controllers/users-controller");
const { auth, upload } = require("../../helpers/middlewares")
const {userSchema} = require("../../validation/user-validation")

const routeUsers = express.Router();

routeUsers.post("/signup", validateBody(userSchema), tryCatchWrapper(signupUser));
routeUsers.post("/login", validateBody(userSchema), tryCatchWrapper(loginUser)); 
routeUsers.get("/logout", tryCatchWrapper(auth), tryCatchWrapper(logoutUser));
routeUsers.get("/current", tryCatchWrapper(auth), tryCatchWrapper(currentUser));
routeUsers.patch("/", tryCatchWrapper(auth), tryCatchWrapper(updateUser)); 
routeUsers.patch("/avatars", tryCatchWrapper(upload.single("avatar")), tryCatchWrapper(auth), tryCatchWrapper(uploadImage));

module.exports = routeUsers;