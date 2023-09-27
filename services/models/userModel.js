const {Schema,model} = require('mongoose')
const userSchema = new Schema(
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
        avatarURL: String,
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
      }
)
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
const userModel = model('users',userSchema)

module.exports = userModel