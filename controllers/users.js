const gravatar = require("gravatar");
const { uuid } = require("uuidv4");
const nodemailer = require("nodemailer");
const { User } = require("../models/user");

const createUser = async (email, password) => {
  const bcrypt = require("bcrypt");
  const hashedPassword = await bcrypt.hash(password, 1);
  const avatarURL = gravatar.url(email, { s: "250", d: "404" });

  try {
    const user = new User({
      email,
      password: hashedPassword,
      avatarURL,
      verify: false,
      verificationToken: uuid(),
    });
    await user.save();

    const auth = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth,
    });

    const html = `
    <div>
    <h3>Click <a href="http://localhost:3000/api/users/verify/${user.verificationToken}">here</a> to confirm your account</h3>
    </div>
    `;

    const sendEmail = async () => {
      const info = await transporter.sendMail({
        from: { name: "Zuzanna", address: "foobar@example.com" },
        to: user.email,
        subject: "Confirm your account",
        html,
      });

      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log(previewUrl);
    };

    await sendEmail();
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
};


const getUserByToken = async (token) => {
  const user = await User.findOne({ token });
  return user;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const logout = async (id) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { $set: { token: '' } },
      { new: true }
    );
    user.save();
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

const currentUser = async (req, res) => {
  try {
    const { token } = req.user;
    const user = await User.getUserByToken({ token });

    if (!user) {
      res.status(401).send("Not authorized");
    }
    res.json({ token });
  } catch (err) {
    console.log(err);
  }
};


const updateAvatar = async (id, avatarURL) => {
  return User.findByIdAndUpdate(
    { _id: id },
    { avatarURL },
    { new: true }
  );
};

const verifyUser = async (verifyToken) => {
  const user = await User.findByIdAndUpdate(
    { verifyToken },
    { verify: true, verifyToken: null },
    { new: true }
  );
  return user;
};
const templateHtml = () => {
  const imgUrl =
    "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1xw:0.74975xh;center,top&resize=1200:*";
  return `
   <h1 style="color:blue">Hi!</h1>
   <div>
   <a href=${imgUrl}></a>
   </div>
   `;
};

module.exports = {
  createUser,
  getUserByToken,
  logout,
  currentUser,
  updateAvatar,
  getUserByEmail,
  verifyUser,
  templateHtml,
}
