const { User } = require("../../models/user");

const updateSub = async (req, res, next) => {
  const { _id } = req.user;
  console.log(req.user);
  const { subscription } = req.body;
  const data = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  res.status(200).json({ data });
};

module.exports = updateSub;
