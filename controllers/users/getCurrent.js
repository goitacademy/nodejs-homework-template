const { User } = require("../../models/index");

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
        subscription,
        Bearer: token,
      },
    },
  });
};

module.exports = getCurrent;
