const { model, Schema } = require("mongoose");
const { handleMongooseError } = require("../utilitie");
const userSubscriptionEnum = require("../constants/userSubscrpEnum");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: Object.values(userSubscriptionEnum),
      default: userSubscriptionEnum.STARTER,
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("users", userSchema);

module.exports = {
  User,
};
