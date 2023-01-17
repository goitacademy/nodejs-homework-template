const express = require('express');
const {
  register,
  login,
  getCurrentUser,
  logout
} = require('../../controllers/users.controller');

const router = express.Router();

const auth = require('../../middlwares/auth');
const { tryCatchWrapper, validateBody } = require('../../helpers/index');
const {joiRegisterSchema, joiLoginSchema} = require("../../models/user");

router.post('/signup', validateBody(joiRegisterSchema), tryCatchWrapper(register));

router.post('/login', validateBody(joiLoginSchema), tryCatchWrapper(login));

router.get('/current', auth, tryCatchWrapper(getCurrentUser));

router.get('/logout', auth, tryCatchWrapper(logout));

module.exports = router;
