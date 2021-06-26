const Users = require("../repositories/users");
const { HttpCode } = require("../helpers/constants");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);

    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        message: "Email in use ",
      });
    }

    const { id, name, email, subscription } = await Users.create(req.body);

    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: { id, name, email, subscription },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);
    if (user) {
      console.log(req.body);
    }
    const isValidPassword = await user?.isValidPassword(req.body.password);

    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        message: "Email or password is wrong",
      });
    }
    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    await Users.updateToken(id, token);
    return res.json({
      status: "success",
      code: 200,
      data: { token },
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  //   try {
  //     const contact = await Users.addContact(req.body);
  //     res.status(201).json({ status: "success", code: 201, data: { contact } });
  //   } catch (e) {
  //     next(e);
  //   }
};

const current = async (req, res, next) => {
  //   try {
  //     const contact = await Users.removeContact(req.params.contactId);
  //     if (contact) {
  //       return res.json({
  //         status: "success",
  //         code: 200,
  //         message: "contact deleted",
  //         data: { contact },
  //       });
  //     }
  //     return res.json({
  //       status: "error",
  //       code: 404,
  //       message: "Not found",
  //     });
  //   } catch (e) {
  //     next(e);
  //   }
};

module.exports = {
  signup,
  login,
  logout,
  current,
};
