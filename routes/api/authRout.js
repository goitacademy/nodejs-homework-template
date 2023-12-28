const { Router } = require("express");
const router = Router();
// const { authMiddleware } = require("../../middlewares");
const middlewares = require("../../middlewares");

router.post("/signup", middlewares.authMiddleware.checkSing);
router.post("/login");
// password restore

// password send instruction in mail , restore password
router.post("/forgot-password");
// password update
router.post("/restore-password");

//================================================================
module.exports = router;
