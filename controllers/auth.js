require("dotenv").config();
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("node:path");
const fs = require("node:fs/promises");
const Jimp = require("jimp");
const ElasticEmail = require("@elasticemail/elasticemail-client");

const User = require("../models/user");

const { authSchema, subscriptionSchema, verifySchema } = require("../routes/schemas/user");

const SECRET_KEY = process.env.SECRET_KEY;
const FROM_EMAIL = process.env.USER_EMAIL;

const defaultClient = ElasticEmail.ApiClient.instance;
const { apikey } = defaultClient.authentications;
apikey.apiKey = process.env.ELASTIC_API_KEY;
const api = new ElasticEmail.EmailsApi();

const avatarsDir = path.join(__dirname, "../public/avatars");



async function register(req, res, next) {
  const body = authSchema.validate(req.body);
  const userBody = body.value;

  if (typeof body.error !== "undefined") {
    return res.status(400).json({
      message: body.error.details.map((err) => err.message).join(", "),
    });
  }

  const { email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const verificationToken = crypto.randomUUID();
  
  const verifyEmail = ElasticEmail.EmailMessageData.constructFromObject({
    Recipients: [new ElasticEmail.EmailRecipient(email)],
    Content: {
      Body: [
        ElasticEmail.BodyPart.constructFromObject({
          ContentType: "HTML",
          Content: `To confirm your registration, follow the <a href="http://localhost:3000/users/verify/${verificationToken}">link</a>`,
        }),
      ],
      Subject: "Welcome to your contact book",
      From: FROM_EMAIL,
    },
  });

  try {
    const newUser = await User.create({
      ...userBody,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });

    api.emailsPost(verifyEmail);

    res.status(201).json({
      user: { email: newUser.email, subscription: newUser.subscription },
    });
  } catch (err) {
    
    if (err.name === "MongoServerError" && err.code === 11000) {
      return res.status(409).json({ message: "Email in use" });
    }
    next(err);
  }
}


async function login(req, res, next) {
  const body = authSchema.validate(req.body);

  if (typeof body.error !== "undefined") {
    return res.status(400).json({
      message: body.error.details.map((err) => err.message).join(", "),
    });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "Email or password is wrong",
    });
  }

    const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    return res.status(401).json({
      message: "Email or password is wrong",
    });
  }

  if (user.verify === false) {
    return res.status(401).json({
      message: "User is not verified",
    });
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
  await User.findByIdAndUpdate(user._id, { token });

  try {
    jwt.verify(token, SECRET_KEY);

    res.json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (err) {
    next(err);
  }
}


async function current(req, res) {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
}


 
async function logout(req, res) {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).end();
}



async function verify(req, res, next) {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken }).exec();

    if (user === null) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: "" });
    
    res.json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
}


async function resendVerify(req, res, next) {
 const body = verifySchema.validate(req.body);

  if (typeof body.error !== "undefined") {
    return res.status(400).json({
      message: "Missing required field email",
    });
  }

  const { email } = req.body;

  try {
    const user = await User.findOne({email}).exec();

    if (user === null) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verify === true) {
      return res.status(400).json({ message: "Verification has already been passed" });
    }

      const verifyEmail = ElasticEmail.EmailMessageData.constructFromObject({
    Recipients: [new ElasticEmail.EmailRecipient(email)],
    Content: {
      Body: [
        ElasticEmail.BodyPart.constructFromObject({
          ContentType: "HTML",
          Content: `To confirm your registration, follow the <a href="http://localhost:3000/users/verify/${user.verificationToken}">link</a>`,
        }),
      ],
      Subject: "Welcome to your contact book",
      From: FROM_EMAIL,
    },
      });
    
    api.emailsPost(verifyEmail);

    res.json({ message: "Verification email sent" });
    
  } catch (error) {
    next(error);
  }
}


async function updateStatusUser(req, res, next) {
  const body = subscriptionSchema.validate(req.body);
  const userBody = body.value;

  if (typeof body.error !== "undefined") {
    return res.status(400).json({ message: body.error.message });
  }

  const { _id } = req.user;

  try {
    const switchSubscription = await User.findByIdAndUpdate(_id, userBody, {
      new: true,
    });

    res.json({
      email: switchSubscription.email,
      subscription: switchSubscription.subscription,
    });
  } catch (err) {
    next(err);
  }
}


async function updateAvatar(req, res, next) {
  const { _id } = req.user;

  if (req.file === undefined) {
    return res.status(400).json({ message: "Image is undefined" });
  }

  const { path: tmpUpload, originalname } = req.file;

  const extname = path.extname(originalname);
  const basename = path.basename(originalname, extname);
  const filename = `${basename}-${_id}${extname}`;

  await Jimp.read(tmpUpload)
    .then((avatar) => {
      return avatar
        .resize(250, 250) // resize
        .write(tmpUpload); // save
    })
    .catch((err) => {
      next(err);
    });

  const resultUpload = path.join(avatarsDir, filename);
  const avatarURL = path.join("avatars", filename);

  try {
    await fs.rename(tmpUpload, resultUpload);

    await User.findByIdAndUpdate(_id, { avatarURL }, { new: true }).exec();

    res.json({
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  current,
  logout,
  verify,
  resendVerify,
  updateStatusUser,
  updateAvatar,
};