const express = require("express");

const ctrl = require("../../controllers/users/auth");

const {validateBody} = require("../../middlewares");

const {schemas} = require("../../models/user")


const router =express.Router();






// signup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register)



module.exports = router;