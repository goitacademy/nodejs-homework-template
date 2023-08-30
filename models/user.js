const { Schema, model } = require('mongoose')



const userSchema = new Schema({
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
  
  token: {
    type: String,
    default: ""
  }
}, { versionKey: false, timestamps: true })

userSchema.post("save", (error, data, next) => {
    const {name, code} = error;
    const status = (name === "MongoServerError" && code === 11000) ? 409 : 400;
    error.status = status;
    console.log(error.status)
    next();
})



// const schemas = {registerUserSchema, loginUserSchema}

const User = model("user", userSchema)

module.exports = User;