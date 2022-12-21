const { createError, resizeImg } = require("../../helpers");

const path = require("path");

const fs = require("fs").promises;

const { updateUserById } = require("../../models/authModel/auth");

const {
  UPLOAD_SUCCESS,
  UPLOAD_FAILED,
} = require("../contacts/contactsConstants");

async function uploadAvatar(req, res, next) {
  try {
    const {
      headers,
      body,
      file,
      user,
      file: { filename, originalname },
    } = req;

    console.log(file);
    if (!file) {
      throw createError({ status: 500, message: UPLOAD_FAILED });
    }

    const tempPath = path.resolve("wwwroot", "../", "temp", filename);

    req.file.tempPath = tempPath;

    const avatar = path.join("avatars", `${user.id}_${originalname}`);

    const newPath = path.resolve("wwwroot", "../public", avatar);

    await fs.rename(tempPath, newPath);

    const avatarURL = `http://${headers.host}/${avatar}`;

    await resizeImg(newPath, 250);

    const updadatedUserData = await updateUserById({
      id: user.id,
      body: { avatarURL },
    });

    res.status(201).json({
      status: 201,
      data: {
        title: body.avatarName,
        url: updadatedUserData.avatarURL,
      },
      oldPath: req.file.oldPath,
      message: UPLOAD_SUCCESS,
    });
  } catch (error) {
    // const fileForDel = await fs.readFile(req.file.tempPath);
    // if (fileForDel) {
    //   await fs.unlink(req.file.tempPath);
    // }

    if (!error.status) {
      error.status = 500;
      error.message = UPLOAD_FAILED;
    }
    next(error);
  }
}
module.exports = uploadAvatar;
