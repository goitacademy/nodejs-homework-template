const express = require("express");
const router = express.Router();
const controlers = require("../../controlers/authorization/index");

router.post("/register", async (req, res, next) => {
  controlers.registrationController(req, res, next);
});
router.get("/login", async (req, res, next) => {
  controlers.loginController(req, res, next);
});
router.post("/logout", async (req, res, next) => {
  controlers.logoutController(req, res, next);
});
router.get("/current", async (req, res, next) => {
  controlers.currentController(req, res, next);
});
module.exports = router;
