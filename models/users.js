const {Schema, model} = require("mongoose");
const handleMongooseError = require('../helpers/handleMongooseError');
const {emailRegexp} = require('../helpers/regExp');
const {subscription} = require('../helpers/subscriprion');

const userSchema = new Schema ({
    password: {
        type: String,
        required: [true, 'Set password for user'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        match:emailRegexp,
        unique: true,
      },
      subscription: {
        type: String,
        enum: subscription,
        default: "starter"
      },
      token: String
},
{ versionKey: false, timestamps: true });

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;