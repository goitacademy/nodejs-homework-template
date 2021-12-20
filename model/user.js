const { Schema, model } = require("mongoose");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const { Subscription, LimitSize } = require("../config/constants");
const bcrypt = require("bcryptjs");
 

const SALT_FACTOR = 6;

const STARTER = Subscription.STARTER;
const PRO = Subscription.PRO;
const BUSINESS = Subscription.BUSINESS;
const AvatarSize = LimitSize.AvatarSize;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate(value) {
        const re = /\S+@\S+.\S+/;
        return re.test(String(value).toLowerCase());
      },
    },
    subscription: {
      type: String,
      enum: [STARTER, PRO, BUSINESS],
      default: STARTER,
    },
    name: {
      type: String,
      default: "Guest",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: AvatarSize }, true);
      },
    },
    idUserCloud: { type: String, default: null },

    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      required: [true, "Verify token is required"],
      default: uuidv4(),
    },
  },

  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(SALT_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

module.exports = User;