const express = require("express");
const router = express.Router();
const ctrlUser = require("../../controllers/users");
const authorization = require("../../auth/authorization");

router.post("/signup", ctrlUser.signUp);

router.post("/login", ctrlUser.logIn);

router.get("/logout", authorization, ctrlUser.logOut);

router.get("/current", authorization, ctrlUser.current);

module.exports = router;