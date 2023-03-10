const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
var  Jimp  =  require ( "jimp" ) ;

const { User } = require("../models/user");

const { HttpErorr, ctrlWrapper } = require("../helpers");

const avatarsDir
  = path.join(__dirname, "../", "public", "avatars");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpErorr(409, "Email in use");
  }
  const hasePassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hasePassword,
    avatarURL,
  });

  res.json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const login = async (req, res) => {
  const { SECRET_KEY } = process.env;
  const { email, password } = req.body;
  const user = await User.findOne({ email });
 const { subscription } = user;
  console.log("subscription", subscription);
  if (!user) {
    throw HttpErorr(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpErorr(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "23h",
  });
await User.findByIdAndUpdate(user._id, { token });


  res.json({
    token,
    user: { email, subscription },
  });
};

const getCurrent = async (req, res) => {
   const { email, subscription } = req.user;
    if (!email) {
      throw HttpErorr(401, "Not authorized");
    }
  console.log(email);
  res.json({
    email,
    subscription,
  });
}

const logout = async (req, res) => {
  const { _id } = req.user;
  if (!_id) {
    throw HttpErorr(401, "Not authorized");
  }
    
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
  
}
 
const updateSubscription = async (req, res, next) => {
  const { _id: owner } = req.user;
  console.log(owner);
  const updateSubscriptionUser = await User.findByIdAndUpdate(owner, req.body, {
    new: true,
  });
  if (!updateSubscriptionUser) {
    throw HttpErorr(404, "Not found");
  }
  res.json({ updateSubscriptionUser, status: "200" });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, filename);
  console.log("resultUpload42453543", resultUpload);

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  if (!_id) {
    throw HttpErorr(401, "Not authorized");
  }

  const formatFile = async () => {
    const image = await Jimp.read(resultUpload);
    image.resize(250, 250);
    image.write(resultUpload);
  }
  formatFile();

  res.status(200).json({
    avatarURL,
  });
}

module.exports = {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};




    // const name = file.originalname.split(".")[0];

    // console.log("name", name);

    // const formatFile = Jimp.read(file.originalname, (err, name) => {
    //   if (err) {
    //     throw err;
    //   }
    //   name.resize(250, 250);
    // }); 