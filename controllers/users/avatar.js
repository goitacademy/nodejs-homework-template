const fs = require('fs/promises');
const path = require('path');
const { User } = require('../../models');
const {
  HTTP_STATUS_CODE,
  STATUS,
  DIRNAME,
} = require('../../helpers/constants.js');

const avatarsDirectory = path.join(
  process.cwd(),
  DIRNAME.PUBLIC,
  DIRNAME.AVATARS,
);

const avatar = async (req, res, next) => {
  const { id } = req.user;
  const { path: temporaryName, originalname } = req.file;
  const avatarName = `${id}_${Date.now()}_${originalname}`;

  try {
    const fileName = path.join(avatarsDirectory, avatarName);

    await fs.rename(temporaryName, fileName);

    const avatarURL = path.normalize(
      path.join(DIRNAME.PUBLIC, DIRNAME.AVATARS, avatarName),
    );

    await User.findByIdAndUpdate(id, { avatarURL });

    res.status(HTTP_STATUS_CODE.OK).json({
      status: STATUS.SUCCESS,
      code: HTTP_STATUS_CODE.OK,
      message: 'Avatar successfully updated',
      payload: { avatarURL },
    });
  } catch (error) {
    await fs.unlink(temporaryName);
    next(error);
  }
};

module.exports = avatar;
