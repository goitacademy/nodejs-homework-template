const express = require("express");
const router = express.Router();
const ctrlRegister = require("../../controllers/registerController");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const validation = require("../../middlewares/validation");
const { joiSchema } = require("../../models/user");

const validateMiddleware = validation(joiSchema);


router.post("/singup", validateMiddleware, ctrlWrapper(ctrlRegister));


module.exports = router;
