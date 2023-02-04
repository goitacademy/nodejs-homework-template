require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { User } = require("../db/usersModel");
const fs = require("fs").promises;
const Jimp = require("jimp");
const sendGridMsg = require("../config/sendEmails");
const { log } = require("console");
const storeImage = path.join(process.cwd(), "public/avatars");
const verificationToken = uuidv4(7);

const SECRET = process.env.SECRET_JWT;

const userSignUp = async (body) => {
  try {
    const avatar = gravatar.url(
      body.email,
      {
        s: "250",
        d: "retro",
      },
      true
    );
    const data = new User({
      email: body.email,
      password: body.password,
      subscription: body.subscription ? body.subscription : "starter",
      avatarUrl: avatar,
      verificationToken: verificationToken,
      verify: false,
    });
    await sendGridMsg(body.email, verificationToken);
    await data.save();
    const user = {
      emai: body.email,
      subscription: body.subscription ? body.subscription : "starter",
      verificationToken,
    };
    return user;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const userVerification = async (verificationToken) => {
  try {
    const data = await User.findOne({ verificationToken });
    if (!data) {
      return null;
    }
    await User.findOneAndUpdate(
      { verificationToken },
      {
        $set: {
          verificationToken: null,
          verify: true,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const userSecondVerificstion = async (email) => {
  try {
    const data = await User.findOne({ email });
    const { verificationToken, verify } = data;
    if (verify) {
      return null;
    }
    await sendGridMsg(email, verificationToken);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const userLogIn = async ({ email, password }) => {
  try {
    const currentUser = await User.findOne({ email });
    if (!currentUser) {
      return null;
    }
    if (!(await bcrypt.compare(password, currentUser.password))) {
      return null;
    }
    const token = jwt.sign({ _id: currentUser._id }, SECRET);
    const responseBody = {
      token,
      user: {
        email: currentUser.email,
        subscription: currentUser.subscription,
      },
    };
    await User.findByIdAndUpdate(currentUser._id, {
      $set: {
        token,
      },
    });
    return responseBody;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const userLogOut = async (id) => {
  try {
    const user = await User.findByIdAndUpdate(id, { token: null });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const userCurrent = async (currentUser) => {
  try {
    if (!currentUser) {
      return null;
    }
    const user = {
      email: currentUser.email,
      subscription: currentUser.subscription,
    };
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const userAvatar = async (req) => {
  if (req.file === undefined) {
    return null;
  }
  const { _id } = req.user;
  const { description } = req.body;
  const { path: temporaryName } = req.file;
  const fileName = path.join(storeImage, _id + ".jpeg");
  try {
    await fs.rename(temporaryName, fileName);
    await Jimp.read(fileName)
      .then((lenna) => {
        return lenna
          .resize(250, 250) // resize
          .write(fileName); // save
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
    await User.findByIdAndUpdate(_id, {
      avatarURL: `${req.protocol + "://" + req.get("host")}/avatars/${
        _id + ".jpeg"
      }`,
    });
  } catch (err) {
    console.log("ERROR");
    await fs.unlink(temporaryName);
    console.log(err);
    return null;
  }
  const avatar = {
    description,
    data: {
      avatarURL: `${req.protocol + "://" + req.get("host")}/api/avatars/${
        _id + ".jpeg"
      }`,
    },
  };

  return avatar;
};

module.exports = {
  userLogIn,
  userCurrent,
  userLogOut,
  userSignUp,
  userAvatar,
  userVerification,
  userSecondVerificstion,
};
