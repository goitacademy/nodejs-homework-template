const { Schema, model } = require('mongoose');

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
    avatarURL: String,
    token: String
  }, {versionKey: false, timestamps: true})

  userSchema.post('save', (error, data, next) => {
    const { code, name } = error;

    if (code === 11000 && name === "MongoServerError") {
        error.status = 409;
    }else {
        error.status = 400;
    }

    next(error)
  })

  
const User = model('user', userSchema)

module.exports = User