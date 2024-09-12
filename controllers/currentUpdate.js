const imageService = require("../services/imageService");

const currentUpdate = async (req, res, next) => {
  const { file, user } = req;

  if (file) {
    const imagePath = await imageService.save(
      file,
      { width: 300, height: 300 },
      "images",
      "users",
      user.id
    );
    console.log("imagePath: ", imagePath);

    // Save the imagePath to the user object as avatarURL
    user.avatarURL = imagePath;
  }

  const updatedUser = await user.save();
  console.log("updatedUser: ", updatedUser);

  res.status(200).json({
    contacts: updatedUser,
  });
};

module.exports = currentUpdate;
