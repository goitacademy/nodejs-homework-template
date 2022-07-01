const services = require("../../services");

const login = async (req, res, next) => {
  try {
    const token = await services.loginUser(req.body);
    return res.json({
      status: "success",
      code: 200,
      data: token,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = login;
