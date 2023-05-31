const express = require("express");
const validate = require("../middleware/validation");
const schemas = require("../schemas");
const router = express.Router();
const {  register } = require("../../controllers");

function foo() {
    console.log(validate(schemas.registerSchema));
}
foo()

router.post("/register", validate(schemas.registerSchema), register);

module.exports = router;
