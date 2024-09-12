const express = require("express");
const {
  postUserValidation,
  patchUserSubscriptionValidation,
} = require("../../middlewares/validationMiddleware");
const {
  registrationController,
  loginController,
  logoutController,
  currentController,
  subscriptionController,
} = require("../../controllers/usersController");
const { asyncWrapper } = require("../../helpers/apiHelpes");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = new express.Router();
router
  .route("/")
  .patch(
    patchUserSubscriptionValidation,
    authMiddleware,
    asyncWrapper(subscriptionController)
  );
router
  .route("/registration")
  .post(postUserValidation, asyncWrapper(registrationController));
router.route("/login").get(postUserValidation, asyncWrapper(loginController));
router.route("/logout").post(authMiddleware, asyncWrapper(logoutController));
router.route("/current").get(authMiddleware, asyncWrapper(currentController));

router.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message:
      "Use api on routes: POST /users/registration, GET /users/login, POST /users/logout, GET /users/current",
    data: "Not found",
  });
});

module.exports = router;
