const asyncHandler = require('../../helpers/asyncHandler');
const AuthSrevice = require('../../services/AuthService');

class AuthController {
  register = asyncHandler(async (req, res) => {
    const { name, email, subscription } = await AuthSrevice.register(req.body);
    res.status(201).json({
      code: 201,
      message: 'User registered successfully',
      data: { name, email, subscription },
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
    res.status(204).json({
      code: 204,
      message: 'User logged out successfully',
    });
  });

  current = asyncHandler((req, res) => {
    const { name, email, subscription } = req.user;
    res.status(200).json({
      code: 200,
      message: 'ok',
      data: { name, email, subscription },
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
}

module.exports = new AuthController();
