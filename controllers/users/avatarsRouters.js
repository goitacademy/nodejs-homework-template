import User from "../service/schemas/user.js";

const avatarsUser = async (req, res, next) => {
  const newUrl = req.body.newUrl;
  await User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    {
      $set: {
        avatarURL: newUrl,
      },
    },
    {
      upsert: false,
    }
  );

  return res.status(200).json({ avatarUrl: newUrl });
};

export default avatarsUser;
