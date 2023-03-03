const mongoose=require('mongoose')
const bcrypt = require('bcryptjs');
const Schema= mongoose.Schema;
const userSchema = new Schema({ 
  username: String,   
        password: {
          type: String,
          required: [true, 'Password is required'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: {
          type: String,
          default: null,
        },
        
      
})

userSchema.methods.setPassword = function(password){
this.password=bcrypt.hashSync(password,bcrypt,bcrypt.genSaltSync(6))
}
userSchema.methods.validPassvord = function(password){
   
    return bcrypt.compareSync(password, this.password)
}

const User= mongoose.model('user',userSchema)
module.exports= User;