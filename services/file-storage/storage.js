const Jimp = require('jimp');
const fs = require('fs/promises');
const path = require('path');
const FOLDER_AVATARS = process.env.FOLDER_AVATARS;
const Users = require('../../repository/users');

class Storage {

    constructor(pathFile,filename,user) {
        this.pathFile = pathFile;
        this.filename = filename;
        this.user = user;
    }

    async transformAvatar(pathFile) {
        const img = await Jimp.read(pathFile);
        await img.autocrop()
        .cover(250,250,
           Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
           .writeAsync(pathFile);
    }
    
    async updateAvatar() {
        await this.transformAvatar(this.pathFile);
        const urlAvatar = await this.save();
        return urlAvatar;

    }


    async save() {
        await fs.rename(this.pathFile, path.join(FOLDER_AVATARS, this.filename));
        const urlAvatar = path.normalize(path.join('avatars', this.filename));
        await Users.updateAvatarUrl(this.user.id, urlAvatar);
        return urlAvatar;

    }

}


module.exports=Storage;