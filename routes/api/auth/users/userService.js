const { UserModel } = require("./userModel");
const { Conflict, NotFound, Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const Jimp = require("jimp");
const multer = require("multer");
const uuid = require("uuid");
const { extname } = require("path");
const gravatar = require("gravatar");
const { promises: FsPromises } = require("fs");
const { mailingClieng } = require("../helpers/mailing");
const TMP_FILES_DIR_NAME = "draft";
const FILES_DIR_NAME = "public/avatars";

const upload = multer({
  storage: multer.diskStorage({
    destination: TMP_FILES_DIR_NAME,
    filename: (req, file, cb) => {
      const filename = uuid.v4() + extname(file.originalname);
      cb(null, filename);
    },
  }),
});

async function compressImage(req, res, next) {
  const file = await Jimp.read(req.file.path);
  const filePath = req.file.path.replace(TMP_FILES_DIR_NAME, FILES_DIR_NAME);

  await file.resize(250, 250).quality(90).writeAsync(filePath);

  await FsPromises.unlink(req.file.path);

  req.file.destination = req.file.destination.replace(
    TMP_FILES_DIR_NAME,
    FILES_DIR_NAME
  );

  req.file.path = filePath;
  next();
}
class AuthService {
  async singUpUser(userCreate) {
    const { username, password, email, subscription } = userCreate;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Conflict(`User with  email ${email} already exists`);
    }

    const newUser = await UserModel.create({
      username,
      passwordHash: await UserModel.hashPassword(password),
      avatarURL: gravatar.url(email, { s: 250, r: "pg", d: "mm" }),
      email,
      subscription,
      verifyToken: uuid.v4(),
    });
    await mailingClieng.sendVerificationEmail(
      newUser.email,
      newUser.verifyToken
    );

    return newUser;
  }

  async singLogin(loginParams) {
    const { email, password } = loginParams;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new NotFound(`User with such email '${email}' not found`);
    }
    const isPasswordCorrect = await UserModel.isPasswordCorrect(
      password,
      user.passwordHash
    );
    if (!isPasswordCorrect) {
      throw new Unauthorized(`Provided password is wrong`);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_AT,
    });
    const userToken = await UserModel.findOneAndUpdate(
      { email },
      { token },
      { new: true }
    );

    return userToken;
  }

  async logout(user) {
    const { _id } = user;

    await UserModel.findByIdAndUpdate(_id, { token: null }, { new: true });
  }

  async subscripStat(user) {
    const { email, subscription } = user;
    await UserModel.findOne({ email });

    await UserModel.isPasswordCorrect(subscription, email);
  }

  async updateAvatar(req) {
    const { _id } = req.user;
    const { filename } = req.file;
    const update = await UserModel.findByIdAndUpdate(
      _id,
      {
        avatarURL: `http://localhost:3000/avatars/${filename}?s=250&r=pg&d=mm`,
      },
      { new: true }
    );
    if (!update) {
      throw new Unauthorized(`User is not found`);
    }
    return update;
  }

  async verifyEmail(verificationToken) {
    const user = await UserModel.findOneAndUpdate(
      { verifyToken: verificationToken },
      { verify: true, verifyToken: null },
      { new: true }
    );
    if (!user) {
      throw new NotFound(
        ` User with verification token '${verificationToken}' was not found`
      );
    }
    return user;
  }

  async verify(email) {
    const user = await UserModel.findOne({ email });
    if (!user.verify === true) {
      await mailingClieng.sendVerificationEmail(user.email, user.verifyToken);
      return false;
    }
    return true;
  }
}

exports.upload = upload;
exports.compressImage = compressImage;
exports.authService = new AuthService();
