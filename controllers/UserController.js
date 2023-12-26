const jwt = require("jsonwebtoken");
const HTTPError = require("../helpers/HTTPError.js");
const HTTPResponse = require("../helpers/HTTPResponse.js");
const UserService = require("../services/UserService.js");
const bcrypt = require("bcrypt");
const fs = require("fs/promises");
const { join } = require("path");
const gravatar = require("gravatar");

class UserController {
  constructor() {
    this.service = UserService;
  }

  createUser = async ({ body }, res) => {
    const user = await this.service.findUser(body.email, "email");

    if (user) {
      HTTPError(409, "Email in use");
    }

    const avatar = gravatar.url(body.email);
    const createdUser = await this.service.createUser({
      ...body,
      avatarURL: avatar,
    });

    HTTPResponse(res, 201, {
      email: createdUser.email,
      subscription: createdUser.subscription,
      avatarURL: createdUser.avatarURL,
    });
  };

  loginUser = async ({ body: { email, password } }, res) => {
    const user = await this.service.findUser(email, "email");
    if (!user || !bcrypt.compare(password, user.password)) {
      HTTPError(401);
    }

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "23h",
    });

    user.token = token;
    await user.save();

    HTTPResponse(res, 200, {
      email: user.email,
      subscription: user.subscription,
      token: user.token,
    });
  };

  changeAvatar = async ({ file }, res) => {
    const { id } = res.locals;
    const user = await this.service.findUser(id, "id");


    const { path: tempUpload, originalname } = file;
    const imageNameWithId = `${user._id}_${originalname}`;
    const resultUpload = join("public", "avatars", imageNameWithId);
    await fs.rename(tempUpload, resultUpload);
    user.avatarURL = resultUpload;
    await user.save();

    HTTPResponse(res, 200, { email: user.email, avatarURL: user.avatarURL });
  };
}

module.exports = new UserController();
