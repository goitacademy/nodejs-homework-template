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

    if (!isUserExist) {
      return {
        success: false,
        result: null,
        message: "Email or password is wrong",
      };
    }

    if (!isUserExist.active) {
      return {
        success: false,
        result: null,
        message: "Email or password is wrong",
      };
    }

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
        // exp: moment().add(3, "minutes").unix(),
      },
      process.env.SECRET_KEY
    );

    // const addToken = await Contact.updateOne(
    // const _ = await Contact.updateOne(
    await Contact.updateOne(
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

    return {
      success: true,
      result: {
        Token: token,
        User: {
          _id: isUserExist._id,
          email: isUserExist.email,
          subscription: isUserExist.subscription,
        },
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

const getContactCurrent = async (_id, owner) => {
  try {
    const contact = await Contact.findById({ _id, owner });

    if (!contact) {
      return {
        success: false,
        result: null,
        message: `No contact found with id: ${_id}`,
      };
    }
    const { email, subscription } = contact;
    return {
      success: true,
      result: {
        email,
        subscription,
      },
      message: `Contact Found`,
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const updateTokenRemove = async (_id, token, owner) => {
  try {
    if (!_id) {
      return {
        success: false,
        result: null,
        message: "Not authorized",
      };
    }
    const contact = await Contact.findByIdAndUpdate(
      { _id, owner },
      { token },
      { new: true }
    );

    if (!contact) {
      return {
        success: false,
        result: null,
        message: "Not found contact",
      };
    }

    return {
      success: true,
      result: contact,
      message: "No Content",
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
  getContactCurrent,
  updateTokenRemove,
};
