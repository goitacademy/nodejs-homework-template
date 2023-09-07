const User = require('../../schemas/users');
const { usersService } = require('../../service');
const { schemaUser, schemaSubscription } = require('../../middlewares/joiValidation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const Jimp = require('jimp');
const path = require('path');
const fs = require('fs').promises;

const userSignup = async (req, res, next) => {
  try {
    const { error } = schemaUser.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const body = req.body;
    const { email, password } = body;
    const user = await User.findOne({ email }).lean();
    if (user) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email is already in use',
        data: 'Conflict',
      });
    }

    const avatarURL = gravatar.url(email, {s: '200', r: 'pg', d: 'robohash'});
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(6));
    const result = await usersService.userSignup(email, hashedPassword, avatarURL);
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        user: {
          email: result.email,
          subscription: result.subscription,
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { error } = schemaUser.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Incorrect email or password',
        data: 'Unauthorized',
      });
    }
    const payload = {
      id: user.id,
      username: user.username,
    };
    const secret = process.env.SECRET;
    const token = await jwt.sign(payload, secret, { expiresIn: '2h' });
    const result = await usersService.userLogin(user, token);
    return res.json({
      status: 'success',
      code: 200,
      token: result.token,
      data: {
        user: {
          email: result.email,
          subscription: result.subscription,
        }
      }
    });
  } catch (error) {
    next(error);
  };
};

const userLogout = async (req, res, next) => {
  try {
    await usersService.userLogout(req.user.id);
    return res.status(204).end();
  } catch (err) {
    next(err);
  };
};
            
const userCurrent = async (req, res) => {
  try {
    const result = await usersService.userCurrent(req.user.id);
    return res.json({
      status: 'success',
      code: 200,
      data: {
        user: {
          email: result.email,
          subscription: result.subscription,
        }
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Unknown error" });
  };
};

const userUpdateSubscription = async (req, res, next) => {
  try {
    const { error } = schemaSubscription.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    };
    const { subscription } = req.body;
    const result = await usersService.userUpdateSubscription(req.user.id, subscription);
    return res.json({
      status: 'success',
      code: 200,
      message: 'Subscription updated successfully',
      data: {
        user: {
          email: result.email,
          subscription: result.subscription,
        }
      },
    })
  } catch (err) {
    next(err);
  };
};

const userUpdateAvatar = async (req, res, next) => {
  const { path: tempPath, filename } = req.file;
  const avatarsDirectory = path.join(process.cwd(), 'public/avatars/' + filename);
  const avatar = await Jimp.read(tempPath);
  await avatar.resize(250, 250).writeAsync(tempPath);

  try {
    await fs.rename(tempPath, avatarsDirectory)
  } catch (err) {
    await fs.unlink(tempPath);
    console.log(err);
  };

  if (req.file) {
    const result = await usersService.userUpdateAvatar(req.user.id, avatarsDirectory);
    return res.json({
      status: 'success',
      code: 200,
      data: {
        user: {
          avatarURL: result.avatarURL,
        }
      }
    });
  } else {
    return res.status(401).json({
      status: 'Unauthorized',
      code: 401,
      message: 'Not authorized',
    });
  }
};

module.exports = {
  userSignup,
  userLogin,
  userLogout,
  userCurrent,
  userUpdateSubscription,
  userUpdateAvatar
};