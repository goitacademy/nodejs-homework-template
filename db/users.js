const { model, Schema } = require('mongoose');
const bCrypt = require('bcrypt')



const usersSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  
});

usersSchema.pre('save', async function () {
    if (this.isNew) {
        this.password = await bCrypt.hash(this.password,10)
    }
})

// usersSchema.method.setPassword = function (password) {
//     this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6))
// }

// usersSchema.method.validPassword = function (password) {
//   return bCrypt.compareSync(password, this.password);
// };

const User = model("User", usersSchema);

module.exports = {
  User,
};