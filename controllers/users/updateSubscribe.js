const { User } = require("../../models/user");

const RequestError = require("../../helpers");

const updateSubscribe = async (req, res) => {
  // console.log(req.user);
  const { _id } = req.user;

  const { subscription } = req.body;

  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  if (!result) {
    throw RequestError(404, "Not found");
  }

  res.json({ subscription });
};

module.exports = updateSubscribe;
