import path from 'path'
import fs from 'fs/promises'
import Users from '../../repository/users'


class LocalStorage {
    constructor(file, user) {
      this.userId = user.id
      this.filename = file.filename
      this.filePath = file.path
      this.folderAvatars = process.env.FOLDER_FOR_AVATARS
    }

    async save() {
        const destination = path.join(this.folderAvatars, this.userId)
        await fs.mkdir(destination, {recursive: true})
        await fs.rename(this.filePath, path.join(destination, this.filename))
        const avatarLink = path.normalize(path.join(this.userId, this.filename))
        await Users.updateAvatar(this.userId, avatarLink)
        return avatarLink 
    }
   
}

export default LocalStorage