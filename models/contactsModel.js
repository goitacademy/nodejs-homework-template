const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const contactRolesEnum = require("../constans/contactRolesEnum");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Dublicated email.."],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: String,

    role: {
      type: String,
      enum: Object.values(contactRolesEnum),
      default: contactRolesEnum.USER,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * Pre save mongoose hook. Fires on Create and Save
 */
contactSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Custom mongoose method to validate password.
contactSchema.method.checkPassword = (candidate, hash) =>
  bcrypt.compare(candidate, hash);

// const salt = await bcrypt.genSalt(10);
// console.log("salt=>>", salt);

// const hashedPassword = await bcrypt.hash(req.body.password, salt);
// console.log("hash=>>", hashedPassword);

// const isPasswordMatch = await bcrypt.compare("Pass*1234", hashedPassword);
// console.log("Match=>>", isPasswordMatch);

const Contact = model("Contact", contactSchema);

module.exports = Contact;
