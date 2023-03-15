const UserSchema =require('../../models/userSchema')

const userAvatarPutch=async(req,res,next)=>{
    console.log('req.body',req.avatarURL)
    

    const {avatarURL}=req.body
    try {
    // const avatar = await UserSchema.updateOne(avatarURL)

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
module.exports= userAvatarPutch
