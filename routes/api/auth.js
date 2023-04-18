const express = require("express");
// express для маршрутизації
const {validateBody} = require("../../middlewares");
const { schemas} = require("../../models");

const {ctrlUser} = require("../../controllers")

const router = express.Router();
// створюємо сторінку записної книжки


//singnup
router.post("/register", validateBody(schemas.registerSchema), ctrlUser.register);

module.exports = router;

