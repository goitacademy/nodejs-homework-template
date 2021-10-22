const express = require("express");

const {
    controllerWrapper,
    validation,
    authenticate,
} = require("../../middlewares");
const { joiSchema } = require("../../models/contact");
const { userContacts: ctrl } = require("../../controllers");

const router = express.Router();

router.post(
    "/",
    authenticate,
    validation(joiSchema),
    controllerWrapper(ctrl.add)
);

router.get("/", authenticate, controllerWrapper(ctrl.getAll));

module.exports = router;