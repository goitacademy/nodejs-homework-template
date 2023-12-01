const express = require("express");
const ctrl = require("../../controllers/user");
const { validateBody, authenticate } = require("../../middlewares");
const { joiUsersSchema, joiUsersSchemaSubscr } = require("../../schema/users");
const { pathUsers } = require("../../consts");

const router = express.Router();

router.post(pathUsers.REGISTER, validateBody(joiUsersSchema), ctrl.register);

router.post(pathUsers.LOGIN, validateBody(joiUsersSchema), ctrl.login);

router.post(pathUsers.LOGOUT, authenticate, ctrl.logout);

router.get(pathUsers.CURRENT, authenticate, ctrl.getCurrent);

router.patch(
  pathUsers.USERS,
  authenticate,
  validateBody(joiUsersSchemaSubscr),
  ctrl.updateSubscription
);

module.exports = router;
