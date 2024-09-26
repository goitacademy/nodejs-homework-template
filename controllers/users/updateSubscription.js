const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const updateSubscription = async (req, res, next) => {
    const { _id } = req.user;
    const data = await User.findByIdAndUpdate(_id, req.body,{new: true});
    if (!data) {
      throw HttpError(404, "Not found");
    }
    res.json({ data });
    // console.log(data);
  };
  module.exports = updateSubscription;