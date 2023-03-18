const UserSchema = require('../../models/userSchema')
 const{ConflictErrors}=require('../../helpers/errors')
const bcrypt = require("bcryptjs");
const gravatar = require('gravatar');


const registrationServices=async( email, password,body)=>{
 try{
  const user = await UserSchema.findOne({ email });
  if(user){
throw new ConflictErrors('Email in use')
  }
  const parole= await bcrypt.hashSync(password, 10);
  //const avatarURL = gravatar.url(email);
  
const gravatarURL = gravatar.url(UserSchema.email, {
      s: "200",
      r: "x",
      d: "404",
    });
     console.log('gravatarURL',gravatarURL)
   
 const userCreate= await UserSchema.create({
          ...body,
          password:parole,
          avatarURL:gravatarURL
        });
        console.log('userCreate registrat',userCreate)
        // const userNew= await userCreate.findOne({ email }).select({
        //   email: 1,
        //   subscription:[1]
        //   _id: 0,
        // });
     //console.log('userNew',userNew)
        
     // await userCreate.save()
       return userCreate
 }catch{(err) 
    next(err);
 } 
}
module.exports=registrationServices