const { Router } = require("express");
const { asuncWrapper } = require("../helpers/asunc_wrapper");
const {
  validateLogin,
  validateUserAuth,
  subscriptionValid,
} = require("../helpers/userValidate");
const { authService, upload, compressImage } = require("./userService");
const { prepereUser } = require("../auth/user_serialize");
const { authorize } = require("../auth/authorization");

const router = Router();

router.post(
  "/users/signup",
  validateUserAuth,
  asuncWrapper(async (req, res, next) => {
    const user = await authService.singUpUser(req.body);
    return res.status(201).send(prepereUser(user));
  })
);

router.post(
  "/users/login",
  validateLogin,
  asuncWrapper(async (req, res, next) => {
    const userWithToken = await authService.singLogin(req.body);
    return res.status(200).send(userWithToken);
  })
);

router.post(
  "/users/logout",
  authorize,
  asuncWrapper(async (req, res, next) => {
    await authService.logout(req.user);
    return res.status(200).send("user is logout");
  })
);

router.get("/users/current", authorize, (req, res, next) => {
  const { email, username, subscription } = req.user;
  res.status(200).send({ email, username, subscription });
});

router.patch("/users/subs", subscriptionValid, async (req, res, next) => {
  await authService.subscripStat(req.body);
  return res.status(200).send(req.body);
});

router.patch(
  "/users/avatars",
  authorize,
  upload.single("avatar"),
  compressImage,
  async (req, res, next) => {
    const userAvarav = await authService.updateAvatar(req);
    return res.status(200).send(userAvarav);
  }
);

router.get(
  "/users/verify/:verificationToken",
  asuncWrapper(async (req, res) => {
    const userVerify = await authService.verifyEmail(
      req.params.verificationToken
    );
    return res.status(200).send(userVerify);
  })
);

router.post(
  "/users/verify",
  asuncWrapper(async (req, res) => {
    if (!req.body.email) {
      return res.status(400).sent({ message: "missing required field email" });
    }
    const verify = await authService.verify(req.body.email);
    if (verify === true) {
      return res
        .status(400)
        .send({ message: "Verification has already been passed" });
    }
    res.status(204).send({ message: "verification letter sent" });
  })
);

module.exports = router;
