
const {NotAutorisate}=require('../../helpers/errors')
const path= require('path');
const Jimp = require("jimp");
const fs = require('fs').promises;
const UserSchema = require('../../models/userSchema')

const FILE_DIR = path.join(__dirname, "./public/avatars");
console.log('FILE_DIR',FILE_DIR)

// const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");
//  console.log('avatarsDir',avatarsDir)

const uploadAvatarServices = async(_id,path,body)=>{
  // console.log('UserSchema',{user})
    const [name, extension]= originalname.split('.');
    const newName= `${_id}-${name}-${extension}`
    const newPath = path.join(FILE_DIR,newName)   
  
    const jimpPath = Jimp.read(newPath, async(err, userAvatar) => {
  
        if (err) throw err;
        userAvatar
          .resize(250, 250) // resize
          .quality(60) // set JPEG quality
          .greyscale() // set greyscale
          .write(newPath); // save
          await fs.unlink(path);
      });
  console.log('jimpPath',jimpPath)
  
  
    const avatar = await UserSchema.findByIdAndUpdate(  { _id: id },
    { avatarURL:jimpPath},
    {
      new: true,
    }
   )
  console.log('avatar',avatar) 
  if(!avatar){
    throw new NotAutorisate('Not authorized with avatar')
  }
  //return avatar
}
module.exports=uploadAvatarServices