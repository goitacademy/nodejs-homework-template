const {Schema, model} = require ('mongoose');

const emailRegexp =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const userSchema = new Schema ({
  
verify:{ 
  type: Boolean,
  default: false,
},
verificationCode:{
  type: String,
  default: "",
},
avatarURL:{
  type: String,
  required: true
},

        password: 
        {
          type: String,
          minlenght: 6,
          required: [true, 'Set password for user'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
          match: emailRegexp,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: String
      }
  , {versionKey: false, timestamps: true});



  const User = model('user', userSchema )
 module.exports = User;