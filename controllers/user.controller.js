const { User } = require("../models/user");
const { Unauthorized } = require("http-errors");
const path = require("path");
const fs = require("fs/promises");

async function logout(req, res, next) {
  const { user } = req;
  const userWithMovies = await User.findById(user._id);

  if (!userWithMovies) {
    throw Unauthorized("Not authorized");
  }

  await User.findByIdAndRemove(user._id);

  return res.status(204, "No Content").json(userWithMovies);
}

async function avatars(req, res, next) {
  const { filename } = req.file;

  const tmpPath = path.resolve(__dirname, "../tmp", filename);

  const publicPath = path.resolve(__dirname, "../public/avatars", filename);

  try {
    await fs.rename(tmpPath, publicPath);
  } catch (error) {
    await fs.unlink(tmpPath);

    throw Unauthorized("Not authorized");
  }
  const movieId = req.params.id;

  // const imagePath = "/public/filename";

  const movie = await User.findByIdAndUpdate(
    movieId,
    {
      avatarURL: `/public/avatars/${filename}`,
    },
    { new: true }
  );
  return res.json({
    data: {
      avatarURL: movie.avatarURL,
    },
  });
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
  avatars,
  current,
  logout,
};
