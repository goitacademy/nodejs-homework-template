const { User } = require('../../models/user');

const HttpError = require('../../helpers');

const updSubscription = async (req, res) => { 
  const { id } = req.params;
  const updUser = await User.findByIdAndUpdate(id, req.body, { new: true });
  // console.log("id: " + id + " subscr: " + updUser.subscription);
  if (!updUser) {
    throw HttpError(404, "Not found");
  }
  res.json(updUser);
}

module.exports = updSubscription;