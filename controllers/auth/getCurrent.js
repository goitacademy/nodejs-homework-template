const { User } = require("../../models/user");

const getCurrent = async (req, res) => {
  try {
    const { _id } = req.user;
    const { email, subscription } = await User.findById(_id);
    res.status(200).json({ email, subscription });
  } catch (error) {
    res.status(500).json({ error: "Wystąpił błąd serwera" });
  }
};

module.exports = getCurrent;
