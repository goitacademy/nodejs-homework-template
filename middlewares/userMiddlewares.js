const fsPromises = require('fs').promises;
const uuid = require('uuid').v4
const User = require("../models/users.js");
const Joi = require("joi");
const { PASSWD_REGEX } = require("../constants/regex.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const Jimp = require('jimp');


const secKey = process.env.JWT_SECRET;

const registrationSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().regex(PASSWD_REGEX).required(),
});
exports.userMiddleware = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = registrationSchema.validate({ email, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "email in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      subscription: "starter",
    });
    const savedUser = await newUser.save();

    const token = jwt.sign({ userId: savedUser.id }, secKey, {
      expiresIn: "1d",
    });
    savedUser.token = token;
    await savedUser.save();
    res.status(201).json({
      user: { email: savedUser.email, subscription: savedUser.subscription },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

exports.loginMiddleware = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { error } = loginSchema.validate({ email, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }
    const token = jwt.sign({ userId: user.id }, secKey, { expiresIn: "2h" });
    user.token = token;
    await user.save();
    user.password = undefined;
    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.checkToken = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "not authorize" });
    }
    const decoded = await jwt.verify(token, secKey);
    console.log('User', decoded, bearer)

    const user = await User.findById(decoded.userId);

    if (!user || token !== user.token) {
      console.log("Invalid token or user not found");
      return res.status(401).json({ message: "not authorize" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in checkToken:", error.message);
    return res.status(401).json({ message: "Not authorized" });
  }
};

exports.currentUser = async (req, res, next) => {
  try {
    if (!req.user || !req.user.email || !req.user.subscription) {
      console.log("Invalid user data", req.user);
      return res.status(401).json({ message: "Not authorized" });
    }

    const currentUserData = {
      email: req.user.email,
      subscription: req.user.subscription,
    };

    res.status(200).json(currentUserData);
  } catch (error) {
    console.error("Error in currentUser:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.logoutMiddleware = async (req, res, next) => {
  
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, {token: ""})
  res.status(204).send();

};

const multerStorage = multer.diskStorage({
  destination: (req, file, cllbck) => {
    cllbck(null, 'temp');
  },
  filename: (req, file, cllbck) => {
  const extention = file.mimetype.split('/')[1];
  cllbck(null, `${req.user.id}-${uuid()}.${extention}`)
  }
});

const multerFilter = (req, file, cllbck) => {
  if (file.mimetype.startsWith('image/')) {
    cllbck(null, true);
  } else {
    cllbck(new Error('Invalid file type'), false);
  }
};

exports. uploadUserAvatar = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
}).single('avatar')

// const proccessAvatar = async (fileBuffer, userId) => {
//   return new Promise((resolve, reject) => {
//     Jimp.read(fileBuffer)
//         .then((image) => {
//             return image.resize(250, 250).write(`public/avatars/${userId}.jpg`, (err) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     const avatarUrl = `/avatars/${userId}.jpg`;
//                     resolve(avatarUrl);
//                 }
//             });
//         })
//         .catch((err) => {
//             reject(err);
//         });
// });
// }

// const proccessAvatar = async (fileBuffer, userId) => {
//       const image = await Jimp.read(fileBuffer);
//       await image.resize(250, 250);
//       await image.writeAsync(`public/avatars/${userId}.jpg`);
//       const avatarUrl = `/avatars/${userId}.jpg`;
//       return avatarUrl;
// };

const resizeImage = async (filePath, targetPath, width, height) => {
  try {
    const image = await Jimp.read(filePath);
    await image.resize(width, height).write(targetPath);
  } catch (error) {
    console.error('Error resizing image:', error.message);
    throw error;
  }
};

exports.updateUser = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file provided' });
    }

    const userId = req.user._id.toString();
    const originalFilePath = req.file.path;
    const resizedFilePath = `public/avatars/${userId}.jpg`;

    await resizeImage(originalFilePath, resizedFilePath, 250, 250);

    const avatarUrl = `/avatars/${userId}.jpg`;
    await fsPromises.unlink(originalFilePath);
    // fs.unlink(originalFilePath);
    req.user.avatarUrl = avatarUrl;
    req.file.path = null;
    await req.user.save();


    res.status(200).json({ avatarUrl });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
