const { User } = require("../../models");
const { HttpError } = require("../../utils");

const current = async (req, res, next) => {
  const { _id: id } = req.user;
  const user = await User.findById(id).exec();
  if (!user) {
    throw HttpError(401, "Not authorized");
  }
  res.json({
    status: "success",
    code: 200,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
  // const { email, name, subscription } = req.user;
  // res.json({
  //   status: "success",
  //   code: 200,
  //   email,
  //   name,
  //   subscription,
  // });
};
module.exports = current;
