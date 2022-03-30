const {model,Schema} = require('mongoose');
const crypto = require('crypto')
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { boolean } = require('joi');

const userSchema = Schema({
  name:{
    type:String,
    default: 'Guest'
  },
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
      
      avatarURL: {
        type:String,
        default:function() {
          return gravatar.url(this.email,{s:'250'}, true)
        }
      },
      isVerify:{
        type:Boolean,
        default:false
      },
      verifyTokenEmail:{
        type:String,
        required: [true, 'Verify token is required'],
        default:crypto.randomUUID()
      }
},
{versionKey:false,timestamps:true}
)

userSchema.pre('save', async function(next) {
        const salt = await bcrypt.genSalt(6);
        this.password = await bcrypt.hash(this.password, salt);
next()
})

userSchema.methods.isValidPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

module.exports = model('user',userSchema);