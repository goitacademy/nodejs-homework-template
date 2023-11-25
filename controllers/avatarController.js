import jimp from 'jimp';
import fs from 'fs/promises';
import userModel from '#models/userModel.js';

export async function updateAvatar(userId, fileBuffer) {
  const user = await userModel.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const image = await jimp.read(fileBuffer);
  await image.resize(250, 250);
  const processedBuffer = await image.getBufferAsync(jimp.MIME_JPEG);

  const uniqueFileName = `${userId}-${Date.now()}.jpg`;

  const tempAvatarPath = `../tmp/${uniqueFileName}`;
  await image.writeAsync(tempAvatarPath);

  const avatarPath = `../public/avatars/${uniqueFileName}`;
  await image.writeAsync(avatarPath);

  await fs.unlink(tempAvatarPath);

  user.avatarURL = `/avatars/${uniqueFileName}`;
  await user.save();

  return user.avatarURL;
}
