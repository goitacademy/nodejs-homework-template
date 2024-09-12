//const { avatarURL, deleteOne } = require("../../models/userSchema");
const UserSchema = require("../../models/userSchema");
const {NotFoundError}= require('../../helpers/errors')
//const uploadAvatarServices =require('../../services/authServise/uploadAvatarServices')
//const jimpPath= require('../../middlewares/jimpPath')
const fs = require("fs/promises");
const paTh= require('path');
const Jimp = require("jimp");
//const { v4: uuidv4 } = require('uuid');
const FILE_DIR=paTh.resolve("./public/avatars");

const uploadAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { fieldname, path, originalname } = req.file;
  console.log('req.file',req.file)
  console.log('req.user',{_id})
 console.log('req.body',req.body)
 if (fieldname !== "avatar") {
  throw new NotFoundError("Missing field avatar!");
}
  try {  
    const [name, extension]= originalname.split('.');
    const newName= `${_id}-${name}.${extension}`
   
    const jimpPath = Jimp.read(path, async(err, userAvatar) => {
      if (err) throw err;
      userAvatar
        .resize(250, 250) // resize
        .quality(60) // set JPEG quality
        .write(newPath); // save
        //await fs.unlink(path);
    });

    const newPath = paTh.join(FILE_DIR,newName) 
    console.log(' newPath', newPath)
   

console.log('jimpPath',jimpPath)

// const newJimpAvatar = await fs.writeFile(path.resolve(__dirname, FILE_DIR), {
//   encoding: "utf8",
// })
//await jimpPath.writeAsync(path)
//  const { fieldname} = req.file;
// if (fieldname !== "avatar") {
//   throw new NotFoundError ("Missing field avatar!");
// }
  // const userAvatar= await uploadAvatarServices(_id,originalname )
 const avatar = await UserSchema.findByIdAndUpdate(  {_id},
  { avatarURL:newPath},
  {
    new: true,
  }
 )
console.log('avatar',avatar) 
if(!avatar){
  throw new NotAutorisate('Not authorized with avatar')
}
    res.status(200).json({
      status: "OK",
      code: 200,
      message: `sucsess ${avatar} userAvatar`,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = uploadAvatar;
