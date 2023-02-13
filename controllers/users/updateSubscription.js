const { User } = require("../../models");
const { NotFound } = require("http-errors");

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user;
  console.log(req.user);
  const { subscription } = req.body;
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    {
      new: true,
    }
  );
  if (!result) {
    throw new NotFound(`Not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: { result },
  });
};

module.exports = updateSubscription;
