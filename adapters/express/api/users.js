const userService = require("../../../services/users");
const createError = require("../../../untils/createError");
const ERROR_TYPES = require("../contastants/errorTypes");
const registerUser = async (req, res, next) => {
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
};
const loginUser = async (req, res, next) => {
  try{
  const { body } = req;
  const { password, email } = body;
  const [user] = await userService.findUser(email);
  if (!user || user.email !== email || user.password !== password) {
    const error = createError(ERROR_TYPES.UNAUTHORIZED, {
      message: `Email or password is wrong`,
    });
    throw error;
  }
  res.status(200).json({
      data:{
      token: "exampletoken",
      user: {
        email: "example@example.com",
        subscription: "starter"
      }}
  })}catch(e){
    next(e)
  }
};

module.exports = { registerUser, loginUser };
