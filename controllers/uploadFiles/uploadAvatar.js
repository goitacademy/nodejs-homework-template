const { createError } = require("../../helpers");
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

    if (!file) {
      throw createError({ status: 500, message: UPLOAD_FAILED });
    }

    console.log(file);

    const oldPath = path.resolve("wwwroot", "../", "temp", filename);

    const newPath = path.resolve(
      "wwwroot",
      "../public",
      "avatars",
      originalname
    );

    await fs.rename(oldPath, newPath);

    const avatar = path.join("avatars", originalname);

    const avatarURL = `http://${headers.host}/${avatar}`;

    const updadatedUserData = await updateUserById({
      id: user.id,
      body: { avatarURL },
    });

    console.log(updadatedUserData);

    res.status(201).json({
      status: 201,
      data: {
        title: body.avatarName,
        avatar,
        url: updadatedUserData.avatarURL,
      },
      message: UPLOAD_SUCCESS,
    });
  } catch (error) {
    if (!error.status) {
      error.status = 500;
      error.message = UPLOAD_FAILED;
    }
  }
}
module.exports = uploadAvatar;
