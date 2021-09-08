const { users: service } = require("../../services");

const logout = async (req, res, next) => {
  try {
    const { _id: id } = req.user;
    await service.update(id, { token: null });
    res.json({
      status: "success",
      code: 200,
      message: "Logout success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
