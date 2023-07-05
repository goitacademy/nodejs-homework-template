const express = require('express');
const validateBody = require('../../middleWares/validation');
const { schema } = require('../../models/userModel');
const { register } = require('../../controllers/user');
const { login } = require('../../controllers/user');
const authorization = require('../../middleWares/Authorization');
const { getCurrent } = require('../../controllers/user');
const { logout } = require('../../controllers/user');

const router = express.Router()

router.post('/register',validateBody(schema.registerSchema), register  );
router.post('/login',validateBody(schema.login) ,login );
router.get('/current', authorization, getCurrent);
router.post('/logout',authorization, logout );




module.exports = router