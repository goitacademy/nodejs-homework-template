const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const { Subscription } = require("../../helpers/constants");
const SALT_WORK_FACTOR = 8;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "set email for user"],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLowerCase());
      },
    },

    password: {
      type: String,
      required: [true, "set password for user"],
      min: 6,
      max: 20,
    },

    subscription: {
      type: String,
      // required: [true, "set subscription for user"],
      enum: {
        values: [Subscription.FREE, Subscription.PRO, Subscription.PREMIUM],
        message: "some message",
      },
      default: Subscription.FREE,
    },
    token: {
      type: String,
      default: null,
      // required: [true, "set token for user"]
    },
    // как пример буля
    // isKnown: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt, null);
  next();
});

// userSchema.path("email").validate(function (value) {
//   const re = /\S+@\S+\.\S+/;
//   return re.test(String(value).toLocaleLowerCase());
// });

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("userSchema", userSchema);

module.exports = User;
