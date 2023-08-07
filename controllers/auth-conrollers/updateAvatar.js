import jimp from "jimp";

import User from "../../models/user.js";

import HttpError from "../../helpers/HttpError.js";

import { updateUserAvatar } from "../../schemas/users-schemas.js";

const updateAvatar = async (request, response, next) => {
  const { error } = updateUserAvatar.validate(request.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const { _id } = request.user;
  const newAvatarPath = request.file.path;

  jimp
    .read(newAvatarPath)
    .then((image) => {
      return image.resize(250, 250).write(newAvatarPath);
    })
    .then(async () => {
      const result = await User.findByIdAndUpdate(
        _id,
        { avatarURL: newAvatarPath },
        { new: true }
      );
      if (!result) {
        throw HttpError(404, `Not authorized`);
      }
      response.json(result);
    })
    .catch((error) => {
      next(error);
    });
};

export default updateAvatar;
