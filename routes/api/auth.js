const express = require("express");
const ctrl = require("../../controllers/auth");
const  validateBody  = require("../../middlewares/validateBody");
const { schemas } = require("../../models/Users");
const  aunauthorized  = require("../../middlewares/aunauthorized "); 

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), ctrl.register)
router.post('/login', validateBody(schemas.loginSchema), ctrl.login)
router.get('/logout', aunauthorized, ctrl.logout);
router.get('/current', aunauthorized, ctrl.currentUser);

module.exports = router;