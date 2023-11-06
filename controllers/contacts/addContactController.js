const { rename } = require("fs/promises");
const { resolve } = require("path");

const { Contact } = require("../../models");
const { controllerWrapper } = require("../../decorators");

const avatarPath = resolve("public", "avatars");

const addContactController = async (req, res) => {
  const { _id: owner } = req.user;
  const { path: oldPath } = req.file;
  await rename(oldPath);
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = {
  addContactController: controllerWrapper(addContactController),
};
