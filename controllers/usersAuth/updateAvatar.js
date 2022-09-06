const updateAvatar = async (req, res, next) => {
  const { id } = req.user;
  const avatarUrl = await saveAvatarUser(req);
  await Users.updateAvatar(id, avatarUrl);
  return res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: { avatarUrl } });
};

module.exports = updateAvatar;
