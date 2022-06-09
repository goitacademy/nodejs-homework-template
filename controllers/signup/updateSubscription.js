const { User } = require("../../models");
const createError = require("http-errors");

const updateSubscription = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await User.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw createError(404, `Contact with id ${contactId} Not found`);
  }
  const { email, subscription } = result;

  res.json({
    status: "success",
    code: 200,
    data: {
      email,
      subscription,
    },
  });
};

module.exports = updateSubscription;
