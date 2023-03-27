const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
      
});
contactSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
 this.password  = await bcrypt.hash(this.password, salt)
  next()
})
contactSchema.methods.checkPassword = (candidate, hashPassword) => bcrypt.compare(candidate, hashPassword)

const User = mongoose.model('User', contactSchema);

module.exports = User
