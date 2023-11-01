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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    token: {
      type: String,
      default: null,
    }
    }, {
    versionKey: false
    }
)

const User = model('users', userSchema)

module.exports = User