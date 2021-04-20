const { UserRepository } = require('../repository/userRepository')
const fs = require('fs/promises')
const jimp = require('jimp')
const path = require('path')


class UserService {
  constructor() {
       this.repository = new UserRepository   
  }

  async addUser(body) {
    const data =  await this.repository.addUser(body)
    return data
  }

  async getById(contactId) {
    const data = await this.repository.getById(contactId)
    return data
  }
  async getByEmail(email) {
    const data = await this.repository.getByEmail(email)
    return data
  }
  async updateSubscription(userID, body) {
    const data = await this.repository.updateSubscription(userID, body)
    return data
  }
  async avatarUpload (userId, avatarPath, originalName) {
    const user = await this.getById(userId);
    const PUBLIC_DIR = path.join(process.cwd(), 'public', 'avatars');

    const img = await jimp.read(avatarPath);

    const imgName = `${user.email}${originalName}`;

    await img
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_CENTER,
      )
      .writeAsync(avatarPath);

    await fs.rename(avatarPath, path.join(PUBLIC_DIR, imgName));

    const url = `/avatars/${imgName}`;

    await this.repository.avatarUpload(userId, { avatarURL: url });

    return url;
  }
}

module.exports = { UserService }