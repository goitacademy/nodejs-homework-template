const fs = require('fs/promises');
const { HTTP_STATUS_CODE, STATUS } = require('../../helpers/constants.js');
const { avatarService, localStorage } = require('../../service/avatar');

const avatar = async (req, res, next) => {
  const { path: tempFilePath } = req.file;
  try {
    // (file.path , width , height)
    await avatarService(req.file, 250, 250);
    const avatarURL = await localStorage(req.file, req.user);

    res.status(HTTP_STATUS_CODE.OK).json({
      status: STATUS.SUCCESS,
      code: HTTP_STATUS_CODE.OK,
      message: 'Avatar successfully updated',
      payload: { avatarURL },
    });
  } catch (error) {
    await fs.unlink(tempFilePath);
    next(error);
  }
};

module.exports = avatar;
