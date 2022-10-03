const { serviceUsers } = require("../../service");

const registerUser = async (req, res, next) => {
  const { body } = req;
  try {
    const results = await serviceUsers.addUser(body);
    res.json({
      status: "success",
      code: 201,
      data: {
        user: results,
      },
    });
  } catch (e) {
    res.status(409).json({
      status: "Conflict",
      message: "Email in use",
    });
  }
};
module.exports = registerUser;
