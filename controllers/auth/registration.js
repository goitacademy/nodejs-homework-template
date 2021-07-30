const userService = require('../../services/auth');
const { authValidateSchema } = require('../../utils/schema');

const registr = async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = authValidateSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: 'Bad request',
      code: 400,
      data: error.message,
    });
    console.log(error);
    return;
  }

  const result = await userService.getOne({ email });
  console.log(result);
  if (result) {
    res.status(409).json({
      status: 'Conflict',
      code: 409,
      message: 'Email in use',
    });
    return;
  }
  try {
    await userService.add({ email, password });
    res.status(201).json({
      status: 'Success',
      code: 201,
      message: 'Registrtion success',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = registr;
