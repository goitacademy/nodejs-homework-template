const express = require("express");
const router = express.Router();

const {
  ctrlLogin,
  ctrlRegistration,
} = require("../../controllers/authControllers");

const { addAuthValidation } = require("../../middlewares/authValidation");

router.post("/users/signup", addAuthValidation, ctrlRegistration);

router.post("/users/login", addAuthValidation, ctrlLogin);

// router.post("/users/logout", ctrlGetContacts);

module.exports = router;
