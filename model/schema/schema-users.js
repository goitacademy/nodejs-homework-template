const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const { Sex } = require("../../helpers/constants");

const SALT_WORK_FACTOR = 8;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 3,
      default: "NewUser",
    },
    sex: {
      type: String,
      enum: {
        values: [Sex.MALE, Sex.FEMALE, Sex.NONE],
        message: "It isn't allowed",
      },
      default: "none",
    },
    email: {
      type: String,
      require: [true, "Email required"],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLocaleLowerCase());
      },
    },
    password: {
      type: String,
      require: [true, "Password required"],
    },
    token: {
      type: String,
      default: null,
    },
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

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

module.exports = User;
