const { User } = require("../../models");

const changeSubscription = async (req, res) => {
  try {
    const { _id } = req.user;
    const { subscription } = req.body;
    const updatrContact = await User.findByIdAndUpdate(
      _id,
      { subscription },
      { new: true }
    );
    res.json({
      status: "success",
      code: 200,
      data: {
        updatrContact,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    });
  }
};
module.exports = changeSubscription;
