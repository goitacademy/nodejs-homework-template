const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const contactSchema = new mongoose.Schema({
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
          avatarURL : { 
            type: String
          }
});
contactSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
 this.password  = await bcrypt.hash(this.password, salt)
  next()
})
contactSchema.pre('save', async function (next) {
  if (this.isNew) {
    const emailHash = crypto.createHash('md5').update(this.email).digest("hex")

    this.avatarURL = `https://www.gravatar.com/avatar/${emailHash}.jpg?d=retro`
    
  }
})
contactSchema.methods.checkPassword = (candidate, hashPassword) => bcrypt.compare(candidate, hashPassword)

const User = mongoose.model('User', contactSchema);

module.exports = User
