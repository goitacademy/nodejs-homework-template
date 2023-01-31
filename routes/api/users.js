const express = require("express")
const { register, login, getCurrentUser, logout } = require("../../controllers/users.controller")
const {auth} = require("../../middlewares/validation")
const usersRouter = express.Router();
const {tryCatchWrapper} = require("../../helpers/index")



usersRouter.post("/register", tryCatchWrapper(register))
usersRouter.post("/login", tryCatchWrapper(login))
usersRouter.post("/logout", auth, tryCatchWrapper(logout))
usersRouter.get("/current", auth, tryCatchWrapper(getCurrentUser))



module.exports = {
    usersRouter,
}
