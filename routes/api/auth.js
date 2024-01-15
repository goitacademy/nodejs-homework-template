const express = require("express");

const { auth } = require("../../controllers");
const { User } = require("../../models/user");
const { validateUser, authenticate } = require("../../middlewares");

const router = express.Router();

router.post("/register",
  validateUser(User),
  auth.register
);

router.post("/login",
  validateUser(User),
  auth.login
);

router.use(authenticate)

router.post('/logout',
  auth.logout
);

router.post('/current',
  auth.current
);

router.patch('/users', auth.subscription)


module.exports = router;