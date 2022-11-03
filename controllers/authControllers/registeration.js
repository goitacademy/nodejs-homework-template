const { signUpUser } = require('../../services/authServices');

const registeration = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await signUpUser({ email, password });
    res.status(201).json({ status: 'Succsess', user: result });
  } catch (error) {
    next(error);
  }
};

module.exports = registeration;
