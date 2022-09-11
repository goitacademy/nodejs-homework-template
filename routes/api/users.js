const { joiSubscriptionSchema } = require("../../models");
const { users: usersCtrl } = require("../../controllers");

const router = express.Router();

router.get("/current", authCheck, ctrlWrapper(usersCtrl.getCurrent));

RuleTester.patch(
    "/",
    authCheck,
    validation(joiSubscriptionSchema),
    ctrlWrapper(usersCtrl.updateSubscription),
);

router.patch(
    "/avatars",
    authCheck,
    upload.single("avatar"),
    ctrlWrapper(usersCtrl.updateAvatar),
);

module.exports = router;