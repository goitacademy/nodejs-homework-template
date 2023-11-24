// services\auth.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../models/contacts");
const moment = require("moment");

const signup = async (Data) => {
  try {
    console.log(Data);
    const email = Data.email;
    const user = await User.findOne({
      email,
    });
console.log(user);
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

    const createdUser = await User.create(Data);

    return {
      success: true,
      result: createdUser,
      message: "Signup successfully.",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const login = async (email, password) => {
  try {
    const isUserExist = await User.findOne({
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

    // const addToken = await User.updateOne(
    // const _ = await User.updateOne(
    await User.updateOne(
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

const current = async (_id, owner) => {
  try {
    const user = await User.findById({ _id, owner });

    if (!user) {
      return {
        success: false,
        result: null,
        message: `No user found with id: ${_id}`,
      };
    }
    const { email, subscription } = user;
    return {
      success: true,
      result: {
        email,
        subscription,
      },
      message: `User Found`,
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const logout = async (_id, token, owner) => {
  try {
    if (!_id) {
      return {
        success: false,
        result: null,
        message: "Not authorized",
      };
    }
    const user = await User.findByIdAndUpdate(
      { _id, owner },
      { token },
      { new: true }
    );

    if (!user) {
      return {
        success: false,
        result: null,
        message: "Not found user",
      };
    }

    return {
      success: true,
      result: user,
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

const updateContactSubscription = async (_id, subscription, owner) => {
  try {
    if (!_id) {
      return {
        success: false,
        result: null,
        message: "Invalid ID",
      };
    }
    // Verifica si el contactId es un ObjectId válido
    // if (!mongoose.Types.ObjectId.isValid(contactId)) {
    //   return {
    //     success: false,
    //     result: null,
    //     message: "Invalid ObjectId format",
    //   };
    // }

    const contactUpdate = await User.findByIdAndUpdate(
      { _id, owner },
      { subscription },
      { new: true }
    );

    if (!contactUpdate) {
      return {
        success: false,
        result: null,
        message: "There was an error to update contact",
      };
    }

  const { _id: Id, name, subscription: Subscription } = contactUpdate;

    return {
      success: true,
      result: { _id: Id, name, subscription: Subscription },
      message: "Contact updated successfully.",
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
  current,
  logout,
  updateContactSubscription,
};
