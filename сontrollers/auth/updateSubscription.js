const { HttpError } = require('../../helpers');

const { User } = require('../../models/user');

const updateSubscription = async (req, res) => {
  // const { error } = addSchema.validate(req.body);
  // if (error) {
  //   throw HttpError(400, "missing fields");
  // }
  const { _id } = req.user;


  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, 'Not Found');
  }
  res.json(result);
};

module.exports = updateSubscription;
