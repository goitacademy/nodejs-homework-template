// controllers/users/AvatarProcessor.js
import path from 'path';
import jimp from 'jimp';

class AvatarProcessor {
  constructor(uploadDir, publicDir, tmpDir) {
    this.uploadDir = uploadDir;
    this.publicDir = publicDir;
    this.tmpDir = tmpDir;
  }

  async processAvatar(filePath, userId) {
    try {
      const image = await jimp.read(filePath);
      await image.cover(250, 250).writeAsync(filePath);

      const uniqueFilename = `${userId}-${Date.now()}.png`;

      const tmpFilePath = path.join(this.tmpDir, uniqueFilename);
      await image.writeAsync(tmpFilePath);
      
      const newFilePath = path.join(this.publicDir, 'avatars', uniqueFilename);
      await image.writeAsync(newFilePath);

      const processedAvatarURL = `/avatars/${uniqueFilename}.png?size=200`;

      return processedAvatarURL;
    } catch (error) {
      throw error;
    }
  }
}

export { AvatarProcessor };
