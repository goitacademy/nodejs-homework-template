const express = require('express');
const router = express.Router();
const registerValidation = require('../../midlewares/validation/registerValidation');
const addUser = require('../../controllers/user/addUser');
const loginUser = require('../../controllers/user/loginUser');
const loginValidation = require('../../midlewares/validation/loginValidation');

// /signup
router
  .post('/register', registerValidation, addUser)
  // signin
  .post('/login', loginValidation, loginUser);

module.exports = router;
