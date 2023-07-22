const express = require("express");
const {validateBody, authenticate} = require("../middlewares");
const {schemas} = require("../models/user");
const {register, login, logout, getUsersData, updateSubscription} = require("../controllers/users");

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), register);
router.post('/login', validateBody(schemas.loginSchema), login);
router.post('/logout', authenticate, logout);
router.get('/current', authenticate, getUsersData);
router.patch('/', authenticate, validateBody(schemas.subscriptionSchema), updateSubscription);

module.exports = router;