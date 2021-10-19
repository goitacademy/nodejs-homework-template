const { Schema, model } = require("mongoose");
const { Subscription } = require("../config/constants");
const bcrypt = require("bcryptjs");
const SALT_FACTOR = 6;

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: "Guest",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        const re = /\S+@\S+.\S+/;
        return re.test(String(value).toLowerCase());
      },
    },
    password: { type: String, required: true },
    subscription: {
      type: String,
      enum: [Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS],
      default: Subscription.STARTER,
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

//пишем хук для соления пароля
userSchema.pre("save", async function (next) {
  // перед тем как сохранить
  if (this.isModified("password")) {
    //проверяем есть изменения в пароле или нет
    const salt = await bcrypt.genSalt(SALT_FACTOR);
    this.password = await bcrypt.hash(this.password, salt); // шифруем пароль, превращаем в хеш
  }
  next();
});

// пишем метод для проверки пароля при логинизации
userSchema.methods.isValidPassword = async function (password) {
  //метод становится экземпляром класса Юзер
  return await bcrypt.compare(password, this.password); //сравнивает пароли. Возвращает буль
};

const User = model("user", userSchema);

module.exports = User;
