const jwt = require("jsonwebtoken");
const {
  findByToken,
  createUser,
  updateToken,
  verifyUser,
  findByEmail,
} = require("../../repository/users");
const { HTTP_STATUS_CODE } = require("../../libs/constants");
const { CustomError } = require("../../middleware/error-handler");
const EmailService = require("../../services/email/service");
const SenderNodemailer = require("../../services/email/senders/nodemailer-sender");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  async create(body) {
    const user = await findByEmail(body.email);
    if (user) {
      throw new CustomError(HTTP_STATUS_CODE.CONFLICT, "Email in use");
    }
    const newUser = await createUser(body);
    const sender = new SenderNodemailer();
    const emailService = new EmailService(sender);

    try {
      await emailService.sendEmail(newUser.email, newUser.verificationToken);
    } catch (error) {
      console.log(error);
      throw new CustomError(
        HTTP_STATUS_CODE.SERVICE_UNAVAILABLE,
        "Error sending email"
      );
    }
    return {
      id: newUser.id,
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
      //   verificationToken: newUser.verificationToken,
    };
  }

  async login({ email, password }) {
    const user = await this.getUser(email, password);
    if (!user) {
      throw new CustomError(
        HTTP_STATUS_CODE.UNAUTHORIZED,
        "Email or password is wrong"
      );
    }
    const token = this.generateToken(user);
    await updateToken(user.id, token);
    return {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    };
  }

  async logout(id) {
    await updateToken(id, null);
  }

  async getUser(email, password) {
    const user = await findByEmail(email);
    if (!user) {
      return null;
    }
    if (!(await user?.isValidPassword(password))) {
      return null;
    }

    if (!user?.verify) {
      throw new CustomError(HTTP_STATUS_CODE.BAD_REQUEST, "User not verified!");
    }
    return user;
  }

  generateToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      subscription: user.subscription,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    return token;
  }

  async verifyUser(token) {
    const user = await findByToken(token);

    if (!user) {
      throw new CustomError(HTTP_STATUS_CODE.NOT_FOUND, "User not found");
    }
    if (user && user.verify) {
      throw new CustomError(
        HTTP_STATUS_CODE.BAD_REQUEST,
        "Verification has already been passed"
      );
    }

    await verifyUser(user.id);

    return user;
  }

  async reverifyUser(email) {
    const user = await findByEmail(email);

    if (!user) {
      throw new CustomError(
        HTTP_STATUS_CODE.NOT_FOUND,
        `User with email: ${email}, not found`
      );
    }
    if (user && user.verify) {
      throw new CustomError(
        HTTP_STATUS_CODE.BAD_REQUEST,
        "Verification has already been passed"
      );
    }

    const sender = new SenderNodemailer();
    const emailService = new EmailService(sender);

    try {
      await emailService.sendEmail(user.email, user.verificationToken);
    } catch (error) {
      console.log(error);
      throw new CustomError(
        HTTP_STATUS_CODE.SERVICE_UNAVAILABLE,
        "Error sending email"
      );
    }

    return user;
  }
}

module.exports = new AuthService();
export {};
