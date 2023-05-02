const express = require("express");
// express для маршрутизації
<<<<<<< HEAD
const {validateBody, authenticate} = require("../../middlewares");
=======
const {validateBody} = require("../../middlewares");
>>>>>>> 22513394b068499e24accb9e01491fc86a886f58
const { schemas} = require("../../models");

const {ctrlUser} = require("../../controllers")

const router = express.Router();
// створюємо сторінку записної книжки

//singnup
router.post("/register", validateBody(schemas.registerSchema), ctrlUser.register);
//signin
router.post("/login", validateBody(schemas.loginSchema), ctrlUser.login);

<<<<<<< HEAD
router.get("/current", authenticate, ctrlUser.currentUser);

router.post("/logout", authenticate, ctrlUser.logout);

router.patch('/subscription', authenticate, ctrlUser.subscription);
=======
>>>>>>> 22513394b068499e24accb9e01491fc86a886f58

module.exports = router;

