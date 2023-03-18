//const { avatarURL, deleteOne } = require("../../models/userSchema");
const UserSchema = require("../../models/userSchema");
const {NotFoundError}= require('../../helpers/errors')
const uploadAvatarServices =require('../../services/authServise/uploadAvatarServices')
//const jimpPath= require('../../middlewares/jimpPath')
const path= require('path');
//const Jimp = require("jimp");
//const { v4: uuidv4 } = require('uuid');
//const FILE_DIR=path.resolve("./public/avatars");

const uploadAvatar = async (req, res, next) => {
  //const { _id} = req.user;
//const f = req.file;
  const body = req.body;
  const { path} = req.file;
 
 
 console.log('req.file',req.file)
 console.log('req.user',req.user)
console.log('req.body,req.params',req.body,req.params)
  try {  
//   const { fieldname} = req.file;
const { _id, avatarURL, email } = req.user;
// if (fieldname !== "avatar") {
//   throw new NotFoundError ("Missing field avatar!");
// }


  const userAvatar= await uploadAvatarServices(_id,path,body )

    res.status(200).json({
      status: "OK",
      code: 200,
      message: `sucsess ${userAvatar} userAvatar`,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = uploadAvatar;
