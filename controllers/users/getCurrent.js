const { ctrlWrapper } = require("../../helpers");
const getCurrent = async (req, res) => {
  const { email } = await req.user;
  res.json({
    status: "success",
    code: 200,
    user: {
      email: email,
      subscription: "starter",
    },
  });
};
module.exports = { getCurrent: ctrlWrapper(getCurrent) };
