import jimp from 'jimp';
import fs from 'fs/promises';
import Users from '../../repository/users.js'
import path from 'path'

class localStorage {
    constructor(file, user){
        this.userId = user.id,
        this.filename = file.filename,
        this.filePath = file.path,
        this.folderAvatars = process.env.FOLDER_FOR_AVATARS
    }

    async save(){
        const destination = path.join(this.folderAvatars, this.userId);
        await fs.mkdir(destination, {recursive: true});
        await fs.rename(this.filePath, path.join(destination, this.filename));
        const avatarUrl = path.normalize(path.join(this.userId, this.filename));
        await Users.updateAvatar(this.userId, avatarUrl)
        return avatarUrl
    }

}

export default localStorage
