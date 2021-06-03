const { Schema, model } = require("mongoose");
const { Subscription } = require("../helpers/constants");
const bcryptjs = require("bcryptjs"); // для шифрования паролей
const SALT_WORK_FACTOR = 8; // параметр для шифрования - соль, с числом количества алгоритмов для шифровки

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/g;
        return re.test(String(value).toLowerCase());
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
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
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcryptjs.genSalt(SALT_WORK_FACTOR);
    this.password = await bcryptjs.hash(this.password, salt);
  }
  next();
});
// шифрование паролей c помощью хука pre, используем метод save(который может вызываться многократно, а нам нужно чтобы он вызвался, только если поле изменилось, для чего прописываем if), т.е. когда будет сохраняться user, то будем сохранять и его password. Чтобы вызвать после сохранения в базу данных можно использовать хук post. Также в параметр принимается асинхронная функция. next - значит: передай укравление дальше. Смысл - перед тем как сохранить данные в базу данных, мы совершаем определенные действия (передаем количество алгоритмов для шифрования, и hash пароль) и передаем управление дальше через next

userSchema.methods.isValidPassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
}; // проверка пароля с помощью уже прикрученых методов mongoose сравниваем имеющийся password с введенным

const User = model("user", userSchema);

module.exports = User;
