// services\auth.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Contact = require("../models/contacts");
const moment = require("moment");

const signup = async (Data) => {
  try {
    const user = await Contact.findOne({
      email: Data.email,
    });

    if (user) {
      return {
        success: false,
        result: null,
        message: "Email in use",
      };
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    Data.password = await bcrypt.hash(Data.password, salt);

    /**
     * pedrito@email.com
     * 123
     *
     * bcrypt.compare()
     */

    // console.log(Data.password);

    if (Data.active === undefined || Data.active === false) {
      Data.active = true;
    }

    const createdUser = await Contact.create(Data);

    return {
      success: true,
      result: createdUser,
      message: "Signup successfully.",
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const login = async (email, password) => {
  try {
    const isUserExist = await Contact.findOne({
      email,
    });

    // valida si el correo existe
    if (!isUserExist) {
      return {
        success: false,
        result: null,
        message: "Email or password is wrong",
      };
    }

    // console.log("isUserExist.active:", isUserExist.email);
    // valida si esta activo luego de que el correo si exista
    if (!isUserExist.active) {
      return {
        success: false,
        result: null,
        message: "Email or password is wrong",
      };
    }

    // realiza la comprobacion de la contrasena si el correo existe y esta activo
    const matchPassword = await bcrypt.compare(password, isUserExist.password);

    if (!matchPassword) {
      return {
        success: false,
        result: null,
        message: "Email or password is wrong",
      };
    }

    const token = jwt.sign(
      {
        Id: isUserExist._id,
        FullName: `${isUserExist.name} ${isUserExist.subscription}`,
        Rol: isUserExist.subscription,
        iat: moment().unix(), // moment when it was created
        exp: moment().add(2, "hours").unix(),
        // exp: moment().add(1250, "minutes").unix(),
      },
      process.env.SECRET_KEY
    );

    const addToken = await Contact.updateOne(
      {
        email: isUserExist.email,
      },
      {
        $set: {
          token,
        },
      },
      { upsert: true }
    );
    console.log(addToken);
    // return {
    //   success: true,
    //   result: {
    //     _id: isUserExist._id,
    //     name: isUserExist.name,
    //     subscription: isUserExist.subscription,
    //     token,
    //   },

    return {
      success: true,
      result: {
        token,
        _id: isUserExist._id,
      },
      message: "Login successfully",
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

module.exports = {
  signup,
  login,
};
