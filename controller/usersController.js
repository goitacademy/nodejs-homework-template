const usersService = require('../services/usersService');
const JoiSchema = require('../schemas/usersSchema');

const register = async (req, res, next) => {
  try {
    let { password, email, subscription, token } = await req.body;
    if (!subscription) {
      subscription = 'starter';
    }
    if (!token) {
      token = '1234';
    }
    const isValid = JoiSchema.allRequired.validate({
      password,
      email,
      subscription,
      token,
    });
    if (isValid.error) {
      res.status(400).json({
        Status: '400 Bad Request',
        'Content-Type': 'application/json',
        ResponseBody: { message: isValid.error.details[0].message },
      });
      return;
    }
    const user = await usersService.addUser({
      password,
      email,
      subscription,
      token,
    });
    if (user) {
      res.status(201).json({
        Status: '201 Created',
        'Content-Type': 'application/json',
        ResponseBody: {},
      });
    }
    res.status(409).json({
      Status: '409 Conflict',
      'Content-Type': 'application/json',
      ResponseBody: {
        message: 'Email in use',
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  register,
};
