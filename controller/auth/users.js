const jwt = require("jsonwebtoken");
const Users = require("../../model/user");
const { Unauthorized } = require("http-errors");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const gravatar = require("gravatar");

//const { User } = require("../../models");
require("dotenv").config();

const { SECRET_KEY } = process.env;

// const register = async (req, res, next) => {
//   try {
//     const { email } = req.body;
//     const user = await Users.findByEmail(email);
//     if (user) {
//       return next({
//         status: 409,
//         message: "Email in use",
//       });
//     }

//     // const avatarURL = gravatar.url(email);

//     const newUser = await Users.create(req.body);
//     return res.status(201).json({
//       user: {
//         email: newUser.email,
//         subscription: newUser.subscription,
//         avatarURL: newUser.avatarURL,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };
// const avatarUrl = path.join(id, newNameAvatar);

const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const avatarURL = gravatar.url(email);
    console.log(avatarURL);
    const user = await Users.findByEmail(email);
    if (user) {
      return next({
        status: 409,
        message: "Email in use",
      });
    }
    const newUser = await Users.create(req.body);
    return res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);
    if (!user) {
      throw new Unauthorized("Email or password is wrong");
    }
    const isValidPassword = await user.validPassword(password);
    if (!user || !isValidPassword) {
      throw new Unauthorized("Email or password is wrong");
    }
    const id = user._id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    await Users.updateToken(id, token);
    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
          avatarURL: user.avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
const logout = async (req, res, _next) => {
  const id = req.user.id;
  await Users.updateToken(id, null);
  return res.status(204).json({});
};

const currentUser = async (req, res, next) => {
  const id = req.user.id;
  try {
    const user = await Users.findById(id);
    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
          avatarURL: user.avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// const updateAvatar = async (req, res) => {
//   const { _id } = req.user;
//   const { path: tempDir, originalname } = req.file;
//   const [extension] = originalname.split(".").reverse();
//   const filename = `${_id}.${extension}`;
//   const uploadDir = path.join(__dirname, "../../", "public\\avatars", filename);
//   try {
//     await fs.rename(tempDir, uploadDir);
//     const image = path.join("avatars", filename);
//     await Users.findByIdAndUpdate(_id, { avatarURL: image });
//     res.json({
//       status: "success",
//       code: 201,
//       message: "Update avatar success",
//     });
//   } catch (error) {
//     await fs.unlink(tempDir);
//     next(error);
//   }
// };

// const avatarDir = path.join(__dirname, "../../public/avatars");

// const updateAvatar = async (req, res) => {
//   const { path: tempPath, originalname } = req.file;

//   try {
//     const { _id } = req.user;

//     const newName = `${_id.toString()}${originalname}`;
//     const uploadPath = path.join(avatarDir, newName);
//     const file = await Jimp.read(tempPath);

//     await file.resize(250, 250).write(tempPath);
//     await fs.rename(tempPath, uploadPath);
//     const avatarURL = `/avatars/${newName}`;

//     await Users.findByIdAndUpdate(_id, { avatarURL: image });

//     res.json({
//       status: "success",
//       code: 200,
//       data: {
//         result: avatarURL,
//       },
//     });
//   } catch (error) {
//     // throw new Error(error);
//     next(error);
//   }
// };
const saveAvatarToStatic = async (req) => {
  const id = String(req.user._id);
  const AVATAR_URL = process.env.AVATAR_URL;
  const pathFile = req.file.path;
  const newNameAvatar = `${Date.now()}-${req.file.originalname}`;
  const img = await Jimp.read(pathFile);
  await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(pathFile);
  await createFolderIsExist(path.join(AVATAR_URL, id));
  await fs.rename(pathFile, path.join(AVATAR_URL, id, newNameAvatar));
  const avatarUrl = path.join(id, newNameAvatar);
  try {
    await fs.unlink(path.join(process.cwd(), AVATAR_URL, req.user.avatarURL));
  } catch (e) {
    console.log(e.message);
  }
  return avatarUrl;
};
const updateAvatar = async (req, res, next) => {
  try {
    const id = String(req.user._id);
    const avatarUrl = await saveAvatarToStatic(req);
    await Users.updateAvatar(id, avatarUrl);
    return res.json({
      status: "success",
      code: 200,
      data: {
        avatarUrl,
      },
    });
  } catch (e) {
    next(e);
  }
};
module.exports = {
  register,
  login,
  logout,
  currentUser,
  updateAvatar,
};
