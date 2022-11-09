
const {Schema,model} = require('mongoose')
const usertSchema = new Schema(
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
    token: String
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const User = model("user", usertSchema)

module.exports = {
  User
}