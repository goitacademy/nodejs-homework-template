const express = require("express");
// /api/users

const { validation, ctrlWrapper } = require("../../middlewares");
// const { joiSchema, favoriteJoiSchema } = require("../../models/contact");
const { auth: ctrl } = require("../../controllers");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");

const router = express.Router();

// router.get("/", ctrlWrapper(ctrl.getListContacts));

// router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

module.exports = router;
