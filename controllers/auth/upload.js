const { uploadAvatar } = require("../../servises/user");

const uploadController = async (req, res) => {

  try {
    const { _id } = req.user;
    const { path: temporaryName, originalname } = req.file;

    const { avatarURL } = await uploadAvatar(_id, {
      temporaryName,
      originalname,
    });

    res.status(200).json({
      avatarURL,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  uploadController,
};
