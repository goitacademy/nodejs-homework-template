const asyncHandler = require('../helpers/asyncHandler');
const AuthSrevice = require('../services/AuthService');
const gravatar = require('gravatar');
const fs = require('fs/promises');
const path = require('path');

class AuthController {
  avatarsDir = path.join(__dirname, '..', 'public', 'avatars');

  register = asyncHandler(async (req, res) => {
    const { name, email, avatarURL, subscription } = await AuthSrevice.register(
      {
        ...req.body,
        avatarURL: gravatar.url(req.body.email),
      }
    );
    res.status(201).json({
      code: 201,
      message: 'User registered successfully',
      data: { name, email, avatarURL, subscription },
    });
  });

  login = asyncHandler(async (req, res) => {
    const token = await AuthSrevice.login(req.body);
    res.status(200).json({
      code: 200,
      message: 'User logged in successfully',
      token,
    });
  });

  logout = asyncHandler(async (req, res) => {
    await AuthSrevice.logout(req.user);
    res.status(200).json({
      code: 200,
      message: 'User logged out successfully',
    });
  });

  current = asyncHandler((req, res) => {
    const { name, email, avatarURL, subscription } = req.user;
    res.status(200).json({
      code: 200,
      message: 'ok',
      data: { name, email, avatarURL, subscription },
    });
  });

  update = asyncHandler(async (req, res) => {
    const { name, email, subscription } = await AuthSrevice.update(
      req.user._id,
      req.body
    );
    res.status(200).json({
      code: 200,
      message: 'User updated successfully',
      data: { name, email, subscription },
    });
  });

  updateAvatar = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { path: tempDir, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const avatarPath = path.join(this.avatarsDir, filename);
    await fs.rename(tempDir, avatarPath);
    const avatarURL = path.join('avatars', filename);
    await AuthSrevice.update(_id, { avatarURL });

    res.status(200).json({
      code: 200,
      message: 'User avatar updated successfully',
      data: { avatarURL },
    });
  });
}

module.exports = new AuthController();
