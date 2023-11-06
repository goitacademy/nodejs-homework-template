const { unlink } = require("fs/promises");

const { Contact } = require("../../models");
const { controllerWrapper } = require("../../decorators");
const { cloudinary } = require("../../helpers");

const addContactController = async (req, res) => {
  const { _id: owner } = req.user;
  const { url: avatar } = await cloudinary.uploader.upload(req.file.path, {
    folder: "avatars",
  });
  await unlink(req.file.path);
  const result = await Contact.create({ ...req.body, avatar, owner });
  res.status(201).json(result);
};

module.exports = {
  addContactController: controllerWrapper(addContactController),
};
