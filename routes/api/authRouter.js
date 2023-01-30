const express = require("express");
const router = express.Router();

const { ctrlSignup, ctrlLogin } = require("../../controllers/authControllers");

const { addAuthValidation } = require("../../middlewares/authValidation");

router.post("/signup", addAuthValidation, ctrlSignup);

router.post("/login", addAuthValidation, ctrlLogin);

// router.post("/logout", ctrlGetContacts);

module.exports = router;
