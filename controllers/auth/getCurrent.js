const { ctrlWrapper } = require("../../helpers");

const getCurrent = async (req, res) => {
  const { name, email } = req.user;

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      email: email,
      name: name,
    },
  });
};

module.exports = { getCurrent: ctrlWrapper(getCurrent) };
