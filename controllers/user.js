const User = require("../service/schemas/user"); // Import modelu użytkownika
const Joi = require("joi");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const multer = require("multer");
const path = require("path");
const jimp = require("jimp");
const fs = require("fs");
const sgMail = require("@sendgrid/mail"); // Importujemy SendGrid

const schema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
  token: Joi.string().default(null),
});

// Multer storage configuration for avatar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "tmp/"); // Files are uploaded to 'tmp' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
      cb(null, true);
    } else {
      cb(new Error("Only .jpg, .jpeg, and .png files are allowed"), false);
    }
  },
}).single("avatar"); // The field name will be 'avatar'

// Authentication middleware
const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "401 Unauthorized",
        contentType: "application/json",
        responseBody: { message: "Not authorized" },
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

// Register user
const register = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  const user = await User.findOne({ email: req.body.email });

  if (error) {
    return res.status(400).json({
      status: "400 Bad Request",
      contentType: "application/json",
      responseBody: error.message,
    });
  }

  if (user) {
    return res.status(409).json({
      status: "409 Conflict",
      contentType: "application/json",
      responseBody: {
        message: "Email in use",
      },
    });
  }

  try {
    const avatarURL = gravatar.url(req.body.email, {
      s: "250",
      r: "pg",
      d: "mm",
    });

    const newUser = new User({
      email: req.body.email,
      subscription: "starter",
      avatarURL,
    });

    // Generowanie tokenu weryfikacyjnego
    const verificationToken = jwt.sign(
      { id: newUser._id },
      process.env.VERIFY_SECRET,
      { expiresIn: "24h" }
    );
    newUser.verificationToken = verificationToken;

    await newUser.setPassword(req.body.password);
    await newUser.save();

    // Logika wysyłania e-maila z linkiem do weryfikacji
    const verifyUrl = `${process.env.BASE_URL}/verify-email/${verificationToken}`;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: req.body.email,
      from: process.env.EMAIL_USER, // Użyj zweryfikowanego nadawcy w SendGrid
      subject: "Email Verification",
      html: `<p>Click the link to verify your email: <a href="${verifyUrl}">${verifyUrl}</a></p>`,
    };

    await sgMail.send(msg);

    res.status(201).json({
      status: "201 Created",
      contentType: "application/json",
      responseBody: {
        message:
          "Registration successful. Please check your email to verify your account.",
      },
    });
  } catch (err) {
    next(err);
  }
};

// Verify email
const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    // Szukamy użytkownika z podanym tokenem
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({
        status: "404 Not Found",
        responseBody: { message: "User not found or already verified" },
      });
    }

    // Aktualizujemy użytkownika - usuwamy token i ustawiamy verify na true
    user.verificationToken = null;
    user.verify = true;
    await user.save();

    return res.status(200).json({
      status: "200 OK",
      responseBody: { message: "Verification successful" },
    });
  } catch (error) {
    next(error);
  }
};

// Resend verification email
const resendVerificationEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      status: "400 Bad Request",
      responseBody: { message: "Missing required field email" },
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "404 Not Found",
        responseBody: { message: "User not found" },
      });
    }

    if (user.verify) {
      return res.status(400).json({
        status: "400 Bad Request",
        responseBody: { message: "Verification has already been passed" },
      });
    }

    // Generowanie nowego tokenu weryfikacyjnego
    const verificationToken = jwt.sign(
      { id: user._id },
      process.env.VERIFY_SECRET,
      { expiresIn: "24h" }
    );
    user.verificationToken = verificationToken;
    await user.save();

    // Wysyłanie e-maila z nowym tokenem weryfikacyjnym
    const verifyUrl = `${process.env.BASE_URL}/verify-email/${verificationToken}`;
    const msg = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Email Verification",
      html: `<p>Click the link to verify your email: <a href="${verifyUrl}">${verifyUrl}</a></p>`,
    };

    await sgMail.send(msg);

    res.status(200).json({
      status: "200 OK",
      responseBody: {
        message: "Verification email sent successfully",
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update avatar
const updateAvatar = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        status: "400 Bad Request",
        contentType: "application/json",
        responseBody: { message: err.message },
      });
    }

    try {
      const userId = req.user._id;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          status: "404 Not Found",
          responseBody: { message: "User not found" },
        });
      }

      const avatarPath = req.file.path;
      const image = await jimp.read(avatarPath);
      await image.resize(250, 250);
      const uniqueFilename = `${userId}-${Date.now()}${path.extname(
        req.file.originalname
      )}`;
      const finalPath = path.join(
        __dirname,
        "../public/avatars",
        uniqueFilename
      );

      await image.writeAsync(finalPath);

      await fs.promises.unlink(avatarPath);
      await cleanTmpFolder();

      user.avatarURL = `/avatars/${uniqueFilename}`;
      await user.save();

      return res.status(200).json({
        status: "200 OK",
        contentType: "application/json",
        responseBody: {
          message: "Avatar updated successfully",
          avatarURL: user.avatarURL,
        },
      });
    } catch (err) {
      next(err);
    }
  });
};

// Czyszczenie katalogu
async function cleanTmpFolder() {
  const tmpDir = path.join(__dirname, "../tmp");
  try {
    const files = await fs.promises.readdir(tmpDir);
    for (const file of files) {
      const filePath = path.join(tmpDir, file);
      await fs.promises.unlink(filePath);
      console.log(`Usunięto: ${filePath}`);
    }
    console.log("Folder tmp wyczyszczony.");
  } catch (error) {
    console.error("Błąd podczas czyszczenia tmp:", error);
  }
}

// Login user
const login = async (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: "400 Bad Request",
      contentType: "application/json",
      responseBody: error.message,
    });
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).json({
      status: "401 Unauthorized",
      responseBody: {
        message: "User with this email doesn't exist",
      },
    });
  }

  const isPasswordValid = await user.validatePassword(req.body.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      status: "401 Unauthorized",
      responseBody: {
        message: "Incorrect password",
      },
    });
  }

  try {
    const payload = {
      id: user._id,
      username: user.username,
    };
    const secret = process.env.AUTH_SECRET;
    const token = jwt.sign(payload, secret, { expiresIn: "12h" });

    user.token = token;
    await user.save();

    return res.json({
      status: "200 OK",
      contentType: "application/json",
      responseBody: {
        token: token,
        user: {
          email: req.body.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

// Logout user
const logout = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    user.token = null;
    await user.save();

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// Get current user data
const current = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user || !user.token) {
      return res.status(401).json({
        status: "401 Unauthorized",
        contentType: "application/json",
        responseBody: {
          message: "Not authorized",
        },
      });
    }

    res.json({
      status: "200 OK",
      contentType: "application/json",
      responseBody: {
        email: req.user.email,
        subscription: req.user.subscription,
        avatarURL: req.user.avatarURL, // Include avatar URL in response
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateSub = async (req, res, next) => {
  const userId = req.user._id;
  const { error } = req.body;

  if (error || !req.body.subscription) {
    return res.status(400).json({
      status: "400 Bad Request",
      contentType: "application/json",
      responseBody: {
        message: "Invalid subscription type",
      },
    });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({
        status: "401 Unauthorized",
        contentType: "application/json",
        responseBody: {
          message: "Not authorized",
        },
      });
    }

    user.subscription = req.body.subscription;
    await user.save();

    res.json({
      status: "200 OK",
      contentType: "application/json",
      responseBody: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  logout,
  auth,
  current,
  updateSub,
  updateAvatar,
  verifyEmail,
  resendVerificationEmail, // Dodano metodę wysyłania ponownego e-maila
};
