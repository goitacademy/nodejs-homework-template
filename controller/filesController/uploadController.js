const {avatarURL}=require('../../models/userSchema')

//const logoutServices =require('../../services/authServise/logoutServices')

const uploadController = async(req,res,next)=>{
    try {
     const user= avatarURL
   //console.log('req.file',req.file) 
  avatarURL = composeAvatarUrl(req.file.path) 

  console.log('user.avatar', user.avatarURL) 
   user.save()
   if(!avatar){
    res.status(401).json({
        status: " Unauthorized",
        code: 401,
       message:`Not authorized with avatar`
      
      });

}
        res.status(200).json({
          status: "OK",
          code: 200,
         message:`sucsess ${avatar} userAvatar`
        
        });

      }catch (err) {
        next(err);
      }
}
module.exports= uploadController
