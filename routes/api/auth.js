const express = require('express');

const ctrl = require("../../controllers/auth");

const schemas = require("../../schemas/user");

const { validateBody, authenticate } = require("../../middlewares");


const router = express.Router();

router.post('/register', validateBody(schemas.userRegisterSchema), ctrl.register);

router.post('/login', validateBody(schemas.userLoginShema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent)

router.post("/logout", authenticate, ctrl.logout)

module.exports = router;
