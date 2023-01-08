const express = require("express");
const router = express.Router();
const controlers = require("../../controlers/authorization/index");

router.post("/register", async (req, res, next) => {
  //   console.log(controlers.reistrationController.registrationController);
  controlers.registrationController.registrationController(req, res, next);
});
router.get("/login", async (req, res, next) => {
  controlers.loginController.loginController(req, res, next);
});
module.exports = router;
