// services\auth.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/contacts");
const moment = require("moment");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const path = require("path");
const { transporter } = require("../utils/nodemailer");
const fs = require("fs").promises;
const { SECRET_KEY, PORT, EMAIL_SEND } = require("../utils/variables");
// const nanoid = require("nanoid");
const { v4: uuidv4 } = require("uuid");

const signup = async (Data) => {
  try {
    // console.log(Data);
    const email = Data.email;

    const user = await User.findOne({
      email,
    });
    // console.log(user);

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

    Data.verificationToken = uuidv4();
    const now = new Date();
    const fecha = now.toISOString().split("T")[0];
    const hora = now.toLocaleTimeString();

    // Construye la URL de verificación
    const verificationURL = `http://localhost:${PORT || 3000}/users/verify/${
      Data.verificationToken
    }`;
    // `Server is running on http://localhost:${PORT || 3000}`;

    // console.log("Fecha:", fecha);
    // console.log("Hora:", hora);
    // console.log("dat", Data);

    const createdUser = await User.create({
      ...Data,
      avatarURL: gravatar.url(Data.email, {
        s: "250",
        d: "identicon",
        r: "pg",
      }),
    });

    // HTML
    const htmlTemplate = (
      await fs.readFile(path.join(__dirname, "../static/html/welcone.html"))
    ).toString();

    // db
    const filledHtml = htmlTemplate
      .replace("{{NameUser}}", createdUser.name)
      .replace("{{emailUser}}", createdUser.email)
      .replace("{{DateUsers}}", `${fecha} ${hora}`)
      .replace("{{verifyUser}}", verificationURL);

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `'"🖥️No_Reply 👻💻" <${EMAIL_SEND}>'`, // sender address
      to: "codekapp5+No_Reply1@gmail.com, codekapp5+No_Reply2@gmail.com", // list of receivers
      subject: "👋🏻Hello, Signup successfully ✔", // Subject line
      text: "Welcome, registration completed", // plain text body
      // html: "<b>Hello world?</b>", // html body
      html: filledHtml,
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //

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

    if (!isUserExist.verify) {
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
      SECRET_KEY
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

const updateAvatar = async (userId, file) => {
  try {
    // Process the avatar with Jimp

    const image = await Jimp.read(file.path);
    await image.resize(250, 250).writeAsync(file.path);

    // Move the avatar to the public/avatars folder with a unique name
    const { name: nameFile } = path.parse(file.originalname);

    const avatarFileName = `${nameFile}_${userId}_${Date.now()}${path.extname(
      file.originalname
    )}`;
    const avatarPath = path.join(
      __dirname,
      "../public/avatars",
      avatarFileName
    );
    await image.writeAsync(avatarPath);

    // Update the avatar URL in the database
    const avatarUrlUpdate = await User.findByIdAndUpdate(userId, {
      avatarURL: `/avatars/${avatarFileName}`,
      // avatarName: nameFile,
    });

    // Delete the temporary file
    require("fs").unlinkSync(file.path);

    // console.log('u', avatarUrlUpdate.avatarURL);
    // console.log('r', data:{ avatarURL });

    const { email, avatarURL } = avatarUrlUpdate;

    return {
      success: true,
      result: { email, avatarURL },
      // data: { avatarURL: `/avatars/${avatarFileName}` },
      message: "Avatar updated successfully.",
    };
  } catch (error) {
    // console.error('Error updating avatar:', error);
    require("fs").unlinkSync(file.path);

    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const verifyUser = async (id) => {
  try {
    const verificationToken = id;
    const user = await User.findOne({ verificationToken });
    // console.log("user", user);

    if (!user) {
      return {
        success: false,
        result: null,
        message: `User not found`,
      };
    }

    await User.updateOne(
      {
        verificationToken,
      },
      {
        $set: {
          verificationToken: null,
          verify: true,
        },
      },
      { upsert: true }
    );
    const { email, subscription } = user;

    // send email
    const now = new Date();
    const fecha = now.toISOString().split("T")[0];
    const hora = now.toLocaleTimeString();

    // html
    const htmlTemplate = (
      await fs.readFile(path.join(__dirname, "../static/html/verifyUser.html"))
    ).toString();

    // BD
    const filledHtml = htmlTemplate
      .replace("{{NameUser}}", user.name)
      .replace("{{emailUser}}", user.email)
      .replace("{{DateUsers}}", `${fecha} ${hora}`);

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `'"🖥️No_Reply 👻💻" <${EMAIL_SEND}>'`, // sender address
      to: "codekapp5+No_Reply1@gmail.com, codekapp5+No_Reply2@gmail.com", // list of receivers
      subject: "👋🏻Hello, Verify successfully ✔", // Subject line
      text: "Welcome, you can now enter", // plain text body
      // html: "<b>Hello world?</b>", // html body
      html: filledHtml,
    });

    console.log("Message sent: %s", info.messageId);

    return {
      success: true,
      result: {
        email,
        subscription,
      },
      message: `Verification successful`,
    };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const verifyUserEmail = async (email) => {
  try {
    if (!email) {
      return {
        success: false,
        result: null,
        message: "missing required field email",
      };
    }
    const isUserExist = await User.findOne({
      email,
    });

    if (!isUserExist) {
      return {
        success: false,
        result: null,
        message: "User not found",
      };
    }

    if (!isUserExist.active) {
      return {
        success: false,
        result: null,
        message: "User not found",
      };
    }

    if (isUserExist.verify) {
      return {
        success: false,
        result: null,
        message: "Verification has already been passed",
      };
    }

    // Date
    const now = new Date();
    const fecha = now.toISOString().split("T")[0];
    const hora = now.toLocaleTimeString();

    // Construye la URL de verificación
    const verificationURL = `http://localhost:${PORT || 3000}/users/verify/${
      isUserExist.verificationToken
    }`;

    // HTML
    const htmlTemplate = (
      await fs.readFile(path.join(__dirname, "../static/html/welcone.html"))
    ).toString();

    // db
    const filledHtml = htmlTemplate
      .replace("{{NameUser}}", isUserExist.name)
      .replace("{{emailUser}}", isUserExist.email)
      .replace("{{DateUsers}}", `${fecha} ${hora}`)
      .replace("{{verifyUser}}", verificationURL);

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `'"🖥️No_Reply 👻💻" <${EMAIL_SEND}>'`, // sender address
      to: "codekapp5+No_Reply1@gmail.com, codekapp5+No_Reply2@gmail.com", // list of receivers
      subject: "👋🏻Hello, Confirmation email resend ✔", // Subject line
      text: "Welcome, registration completed, Confirmation email resend", // plain text body
      // html: "<b>Hello world?</b>", // html body
      html: filledHtml,
    });

    console.log("Message sent: %s", info.messageId);

    return {
      success: true,
      result: {
        User: {
          email: isUserExist.email,
          subscription: isUserExist.subscription,
        },
      },
      message: "Verification email sent",
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
  updateAvatar,
  verifyUser,
  verifyUserEmail,
};
