const jwt = require("jsonwebtoken");
const HTTPError = require("../helpers/HTTPError.js");
const HTTPResponse = require("../helpers/HTTPResponse.js");
const UserService = require("../services/UserService.js");
const bcrypt = require("bcrypt");
const fs = require("fs/promises");
const { join } = require("path");
const gravatar = require("gravatar");
const Jimp = require("jimp");

class UserController {
  constructor() {
    this.service = UserService;
  }

  createUser = async ({ body }, res) => {
    const user = await this.service.findUser(body.email, "email");

    if (user) {
      throw HTTPError(409, "Email in use");
    }

    const avatar = gravatar.url(body.email);
    const createdUser = await this.service.createUser({
      ...body,
      avatarURL: avatar,
    });

    HTTPResponse(res, 201, createdUser);
  };

  loginUser = async ({ body: { email, password } }, res) => {
    const user = await this.service.findUser(email, "email");

    if (!user || !bcrypt.compare(password, user.password)) {
      throw HTTPError(401);
    }

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "23h",
    });

    user.token = token;
    await user.save();

    HTTPResponse(res, 200, { email: user.email, token: user.token });
  };

  logout = async (_, res) => {
    const user = await this.service.findUser(res.locals.user.id, "_id");

    if (!user) {
      throw HTTPError(401);
    }

    user.token = null;
    await user.save();
    HTTPResponse(res, 204);
  };

  updateSubscription = async ({ body }, res) => {
    const user = await this.service.findUser(res.locals.user.id, "_id");

    if (!user) {
      throw HTTPError(401);
    }

    user.subscription = body.subscription;
    await user.save();

    HTTPResponse(res, 200, {
      email: user.email,
      subscription: user.subscription,
    });
  };

  currentUser = async (_, res) => {
    const user = await this.service.findUser(res.locals.user.id, "_id");

    console.log(user);

    if (!user) {
      throw HTTPError(401);
    }

    HTTPResponse(res, 200, { ...user, password: "000" });
  };

  changeAvatar = async ({ file }, res) => {
    const user = await this.service.findUser(res.locals.user.id, "_id");

    if (!user) {
      HTTPError(401);
    }

    const { path: tempUpload, originalname } = file;
    const imageNameWithId = `${user.name}_${originalname}`;

    const absolutPath = join("public", "avatars", imageNameWithId);
    const serverPath = join("avatars", imageNameWithId);

    const image = await Jimp.read(tempUpload);
    image.resize(250, 250);

    image.write(absolutPath);
    await fs.rm(tempUpload);

    user.avatarURL = serverPath;
    await user.save();

    HTTPResponse(res, 200, { email: user.email, avatarURL: user.avatarURL });
  };
}

module.exports = new UserController();
