const {Schema, model} = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");
const {emailRegexp} = require("../constants/users");

const userSchema = new Schema({
        password: {
          type: String,
          minlength: 6,
          required: [true, 'Set password for user'],
        },
        email: {
          type: String,
          match: emailRegexp,
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
        },
      }, {versionKey: false});

      userSchema.post("save", handleMongooseError);   

      const User = model("user", userSchema);

      module.exports = User;
