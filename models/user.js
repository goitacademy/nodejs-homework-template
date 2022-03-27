const {model,Schema} = require('mongoose');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const userSchema = Schema({
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