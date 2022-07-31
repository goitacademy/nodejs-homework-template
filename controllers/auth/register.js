const { basedir } = global;
const bcrypt = require('bcryptjs');
const { User, schemas } = require(`${basedir}/models/user`);
const createErr = require(`${basedir}/helpers/createError`);

const register = async (req, res) => {
  const { error } = schemas.register.validate(req.body);
  if (error) {
    throw createErr(400, error.message);
  }
  const { email, password,} = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createErr(409, `${email} is use`);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({...req.body, password : hashPassword});

  res.status(201).json({
    email: result.email,
    password : hashPassword
  });
};

module.exports = register;
