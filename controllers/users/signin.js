const services = require("../../services");
const signin = async (req, res, next) => {
  try {
    const user = await services.signinUser(req.body);
    const { email, avatarURL } = user;
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        email,
        avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = signin;
