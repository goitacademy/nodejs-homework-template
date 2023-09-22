const express = require("express");
const handlerError = require("../../../middlewears/handlerError");
const router = express.Router();
const createError = require("../../../untils/createError");
const ERROR_TYPES = require('../contastants/errorTypes')
const userService = require("../api/users");
const validateUser = require("../../../middlewears/validateUser");
router.post("/users/register", validateUser, async (req, res, next) => {
  try {
    const { body } = req;
    const { email } = body;
    const checkEmail = await userService.findUser(email);
    if (Object.keys(checkEmail).length) {
      const error = createError(ERROR_TYPES.CONFLICT, {
        message: `CONFLICT`,
      });
      throw error;
    }
    const user = await userService.registerUser(body);
    res.status(200).json({
      message: "user created",
    });
  } catch (e) {
    next(e);
  }
});
router.use(handlerError);

module.exports = router;
