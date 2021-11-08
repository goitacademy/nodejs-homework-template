const router = require("express").Router();
const { validation, controller, authorization } = require("../../middlewares");
const {
  authModel: { JoiSchemaUser },
} = require("../../models");
const { auth } = require("../../controllers");

router.post("/signup", validation(JoiSchemaUser), controller(auth.signup));
router.post("/login", validation(JoiSchemaUser), controller(auth.login));
router.get("/logout/:userId", authorization(), controller(auth.logout));

module.exports = router;
