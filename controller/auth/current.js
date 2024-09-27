const { RequestError } = require("../../helpers");
const User = require("../../service/schemas/user/users");

const current = async (req, res, next) => {
  try {
    const { user } = req;
    const result=await User.findById({ _id: user.id });
    if (!res) {
        RequestError(401, "Not authorized")
    }
    res.status(200).json({ message: {email:result.email,subscription:result.subscription} });
  } catch (error) {
    next(error);
  }
};
module.exports = current;