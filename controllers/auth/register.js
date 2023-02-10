const {createUser} = require("../../services/index");
const bcrypt = require("bcrypt");

const HttpError = require("../../helpers/HttpError");

async function register(req, res, next) {
    const { email, password } = req.body;
  
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
      const newUser = await createUser({
        email,
        password: hashedPassword,
      });
      return res.status(201).json(newUser);
    } catch (error) {
      next(new HttpError(409, "Email in use"));
    }
}

module.exports = {register};