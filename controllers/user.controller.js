const { User } = require("../models/user");
const { Unauthorized } = require("http-errors");

async function logout(req, res, next) {
  const { user } = req;
  const userWithMovies = await User.findById(user._id);

  if (!userWithMovies) {
    throw Unauthorized("Not authorized");
  }

  await User.findByIdAndRemove(user._id);

  return res.status(204, "No Content").json(userWithMovies);
}

async function current(req, res, next) {
  const {
    user: { email, subscription },
  } = req;

  return res.status(200).json({
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
}

module.exports = {
  createContact,
  getContacts,
  current,
  logout,
};
