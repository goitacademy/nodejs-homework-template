const express = require('express');

const {register,login,getCurrent,logout} = require("../../controllers/users");

const schemas = require("../../schemas/user");

const { validateBody, authenticate } = require("../../middlewares");


const router = express.Router();

router.post('/register', validateBody(schemas.userRegisterSchema), register);

router.post('/login', validateBody(schemas.userLoginShema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

module.exports = router;
