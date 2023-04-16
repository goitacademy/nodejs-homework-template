const bcrypt = require('bcrypt');
const {Schema, model} = require('mongoose');

const UserSchema = new Schema(
  {
    password: {
        type: String,
        required: [true, 'Set password for user'],
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
    avatarURL: {
      type: String,
    },
    token: {
      type: String
    },
    },
  { versionKey: false }
);

UserSchema.pre('save', async function(next) {  
  
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)

  next()
})

UserSchema.methods.checkPassword = (candidate, hash) => bcrypt.compare(candidate, hash)

const User = model('Users', UserSchema);

module.exports = User;