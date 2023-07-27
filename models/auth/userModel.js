const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const userRolesEnum = require('../../constants/userRolesEnum');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, 'Duplicated email..'],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    year: Number,
    role: {
      type: String,
      // enum: ['admin', 'user', 'moderator'],
      enum: Object.values(userRolesEnum),
      default: userRolesEnum.USER,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Pre save mongoose hook. Fires on Create and Save.
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

/**
 * Custom mongoose method to validate password. Will use in future.
 * @param {string} candidate
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
userSchema.methods.checkPassword = (candidate, hash) =>
  bcrypt.compare(candidate, hash);

const User = model('User', userSchema);

module.exports = User;
