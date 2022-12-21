const { createError } = require("../../helpers");
const path = require("path");
const fs = require("fs").promises;

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

    res.status(201).json({
      status: 201,
      data: {
        title: body.title,
        avatar,
        url: `http://${headers.host}/${avatar}`,
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
