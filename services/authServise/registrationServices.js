const UserSchema = require('../../models/userSchema')
// const{}=require('../../helpers/errors')
const bcrypt = require("bcryptjs");
const gravatar = require('gravatar');


const registrationServices=async( email, password)=>{
    // const { email, password } = req.body;
    //  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    // console.log(hashPassword)
    let avatarURL = gravatar.url(UserSchema.email, {
      s: "200",
      r: "x",
      d: "404",
    });
    // let updatedUser = {
    //   ...UserSchema,
    //   avatarURL: avatarURL,
    // };
    const newUser = new UserSchema({
          email,
          password:bcrypt.hashSync(password, 10),
          avatarURL
        });
        
      console.log('newUser',newUser)
        
      await newUser.save()
       return newUser
}
module.exports=registrationServices