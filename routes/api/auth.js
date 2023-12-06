const express = require("express");
const { validation, ctrlWrapper } = require("../../middlerwares");
const { schemas } = require("../../models/user");
const { authController: ctrl } = require("../../controllers");

const router = express.Router();

// router.get("/", async (req, res, next) => {
//   try {
//     console.log("get");
//     return res.status(200).json({ message: "response" });
//   } catch (error) {
//     console.log("error", error.message);
//     next(error);
//   }
// });

router.post(
  "/register",
  validation(schemas.registerLoginSchema),
  ctrlWrapper(ctrl.register)
);

router.get("/login", validation(schemas.registerLoginSchema));
module.exports = router;
