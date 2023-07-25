const { User } = require("../../models");
const service = require("../../service");
const updateSubscription = async (req, res, next) => {
  const { id } = req.user;
  const result = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    select: "-_id email subscription",
  });
  service.CheckByError(!result, 404, "Not found");
  res.status(200).json(result);
};
module.exports = service.ctrlWrap(updateSubscription);
