

//const logoutServices =require('../../services/authServise/logoutServices')

const uploadController = async(req,res,next)=>{
    try {
   console.log('req.file',req.file) 
  //  user.avatarURL = composeAvatarUrl(req.file.path) 

   user.save()
        res.status(200).json({
          status: "OK",
          code: 200,
         message:`sucsess`
        
        });

      }catch (err) {
        next(err);
      }
}
module.exports= uploadController
