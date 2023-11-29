const { Schema, model } = require('mongoose');



const userSchema= new Schema(
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
    token:{type: String}
  });



  userSchema.post("save", (error, data, next) =>{
    error.status = 400;
    next();
  })


  userSchema.pre("findOneAndUpdate", function(next) {
    this.options.new = true;
    this.options.runValidators = true;
    next();
});

userSchema.post("findOneAndUpdate",(error, data, next) =>{
    error.status = 400;
    next();

  })
const User=model('User', userSchema);


module.exports = User;
