const jwt = require("jsonwebtoken");
const Users = require("../../repository/users");
const { HTTP_STATUS_CODE } = require("../../libs/constant");
const { CustomError } = require("../../middleware/error-handler");
const EmailService = require("../email/service");
const SenderNodemailer = require("../email/senders/nodemailer-sender");
const SenderSendGrid = require("../email/senders/sendgrid-sender");

const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  async create(body) {
    const user = await Users.findByEmail(body.email);
    if (user) {
      throw new CustomError(HTTP_STATUS_CODE.CONFLICT, "User already exists");
    }
    const newUser = await Users.create(body);

    const sender = new SenderSendGrid();
    const emailService = new EmailService(sender);
    try {
      await emailService.sendEmail(
        newUser.email,
        newUser.name,
        newUser.verifyEmailToken
      );
    } catch (error) {
      console.log(error);
    }
    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.avatar,
    };
  }

  async login({ email, password }) {
    const user = await this.getUser(email, password);
    if (!user) {
      throw new CustomError(
        HTTP_STATUS_CODE.UNAUTHORIZED,
        "Invalid credentials"
      );
    }
    const token = this.generateToken(user);
    await Users.updateToken(user.id, token);
    return { token };
  }

  async logout(id) {}

  async getUser(email, password) {
    const user = await Users.findByEmail(email);

    if (!user) {
      return null;
    }

    if (!(await user?.isValidPassword(password))) {
      return null;
    }

    return user;
  }

  generateToken(user) {
    const payload = { id: user.id, name: user.name, role: user.role };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    return token;
  }

  async verifyUser(token) {
    const user = await Users.findByToken(token);
    if (!user) {
      throw new CustomError(HTTP_STATUS_CODE.BAD_REQUEST, "Invalid token");
    }

    if (user && user.isVerify) {
      throw new CustomError(
        HTTP_STATUS_CODE.BAD_REQUEST,
        "User already verified"
      );
    }

    await Users.verifyUser(user.id);
    return user;
  }

  async reverifyEmail(email) {
    const user = await Users.findByEmail(email);
    if (!user) {
      throw new CustomError(
        HTTP_STATUS_CODE.NOT_FOUND,
        "User with email not found"
      );
    }

    if (user && user.isVerify) {
      throw new CustomError(
        HTTP_STATUS_CODE.BAD_REQUEST,
        "User already verified"
      );
    }

    const sender = new SenderNodemailer();
    const emailService = new EmailService(sender);
    try {
      await emailService.sendEmail(
        user.email,
        user.name,
        user.verifyEmailToken
      );
    } catch (error) {
      throw new CustomError(
        HTTP_STATUS_CODE.SERVICE_UNAVAILABLE,
        "Error sending email"
      );
    }
  }
}

module.exports = new AuthService();
