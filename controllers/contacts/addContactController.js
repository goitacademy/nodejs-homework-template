const { rename } = require("fs/promises");
const { resolve, join } = require("path");

const { Contact } = require("../../models");
const { controllerWrapper } = require("../../decorators");
const { cloudinary } = require("../../helpers");

const avatarPath = resolve("public", "avatars");

const addContactController = async (req, res) => {
  const { _id: owner } = req.user;
  const fileData = await cloudinary.uploader.upload(req.file.path, {
    folder: "avatars",
  });
  const avatar = join("public", "avatars", filename);
  const result = await Contact.create({ ...req.body, avatar, owner });
  res.status(201).json(result);
};

module.exports = {
  addContactController: controllerWrapper(addContactController),
};
