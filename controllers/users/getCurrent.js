// const { User } = require("../../models");

const getCurrent = async (req, res) => {
  const { name, email } = req.user;
  console.log(req.user);
  res.json({
    status: "succes",
    code: 200,
    data: {
      user: {
        name,
        email,
      },
    },
  });
};

module.exports = getCurrent;
