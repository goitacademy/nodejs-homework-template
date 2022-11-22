const express = require("express");

const auth = require("../../controller/authController");
const {
  schemaPasswordValidation,
} = require("../../service/schema/validationSchemas");
const { validateSchema } = require("../../middlewares/SchemaValidator");
const { authMiddleware } = require("../../middlewares/authMiddlware");
const { asyncWrapper } = require("../../helpers/apiHelper");
const router = express.Router();
router.use(authMiddleware);

router.post(
  "/signup",
  validateSchema(schemaPasswordValidation),
  asyncWrapper(auth.signupController)
);

router.post(
  "/signin",
  validateSchema(schemaPasswordValidation),
  asyncWrapper(auth.singinController)
);

router.post("/logout", asyncWrapper(auth.logoutController));

router.get("/current", asyncWrapper(auth.currentUserController));
module.exports = router;
