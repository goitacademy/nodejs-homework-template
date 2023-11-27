const { ctrlWrapper } = require("../../helpers");
const getCurrent = async (req, res) => {
  const { email } = await req.user;
  res.status(200).json({
    user: {
      email: email,
      subscription: "starter",
    },
  });
};
module.exports = { getCurrent: ctrlWrapper(getCurrent) };
