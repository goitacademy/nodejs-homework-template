const { User, users } = require("./data");

const findByEmail = jest.fn((email) => {
  const [user] = users.filter((el) => String(el.email) === String(email));
  return user;
});

const findById = jest.fn((id) => {
  const [user] = users.filter((el) => String(el._id) === String(id));
  return user;
});

const create = jest.fn(({ email, password, subscription }) => {
  console.log(
    "🚀 ~ file: users.js ~ line 14 ~ create ~ subscription",
    subscription
  );
  console.log("🚀 ~ file: users.js ~ line 14 ~ create ~ password", password);
  console.log("🚀 ~ file: users.js ~ line 14 ~ create ~ email", email);
  const pass = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  const newUser = {
    email,
    password: pass,
    subscription,
    _id: "60904db6039f7d2558890db7",
    validPassword: function (pass) {
      return bcrypt.compareSync(pass, this.password);
    },
  };
  users.push(newUser);
  return newUser;
});

const updateToken = jest.fn((id, token) => {
  return {};
});

const updateSubscription = jest.fn((id, subscription) => {
  return {};
});

const updateAvatar = jest.fn((id, avatar, idCloudAvatar = null) => {
  const [user] = users.filter((el) => String(el._id) === String(id));
  user.avatar = avatar;
  user.idCloudAvatar = idCloudAvatar;
  console.log("🚀 ~ file: users.js ~ line 29 ~ updateAvatar ~ user", user);
  return user;
});

module.exports = {
  findByEmail,
  create,
  findById,
  updateToken,
  updateSubscription,
  updateAvatar,
};
