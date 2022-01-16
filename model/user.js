import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar/lib/gravatar';

const { Schema, model } = mongoose

const userSchema = new Schema(
    {
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        password: {
          type: String,
          required: [true, 'Password is required'],
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
        avatar: {
          type:String,
          default: function() {
            return gravatar.url(this.email, {s:'250'}, true)
          },
        }
    },
{
    versionKey:false,
     timestamps:true, 
     toJSON: {
         virtuals:true,
         transform: function(doc, ret) {
         delete ret._id
         return ret
     },
  },
     toObject: {virtuals: true}
},
);
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(6)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})
userSchema.methods.isValidPassword = async function(password){
  return await bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

export default User