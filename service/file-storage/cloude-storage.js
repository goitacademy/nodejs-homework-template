import {v2 as cloudynary} from 'cloudinary';
import { promisify } from 'util';
import { CLOUD_FOLDER_AVATARS } from '../../lib/constants.js';
import Users from '../../repository/users.js';
import { unlink } from 'fs/promises'

cloudynary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure: true
  });

class CloudStorage {
    constructor( file, user){
        this.userId = user.id,
        this.filepath = file.path,
        this.idAvatarCloud = user.idAvatarCloud
        this.folderAvatars = CLOUD_FOLDER_AVATARS,
        this.uploadFile = promisify(cloudynary.uploader.upload)
    }

    async save(){
        const {public_id: returnedIdAvatarCloud, secure_url: avatarUrl} = await this.uploadFile(this.filepath, {
            public_id: this.idAvatarCloud,
            folder: this.folderAvatars
        })
        const newIdAvatarCloud = returnedIdAvatarCloud.replace(`${this.folderAvatars}/`, '');
        
        await Users.updateAvatar(this.userId, avatarUrl, newIdAvatarCloud);

        await this.remuveFilePath(this.filepath)
        
        return avatarUrl
    }

    async remuveFilePath(filePath){
        console.log(filePath);
        try {
            await unlink(filePath)
        } catch (error) {
            console.error(error.message)
        }

    }

}

export default CloudStorage