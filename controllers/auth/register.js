/* eslint-disable no-unused-vars */

const bcrypt = require('bcryptjs');
const { Conflict } = require('http-errors');
const { User } = require('../../models');

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict('Already register');
    // return res.status(409).json({
    //   status: 'error',
    //   code: 409,
    //   message: 'Already register',
    // });
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({ email, password: hashPassword });
  // const result = await User.create({ email, password });
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Success register',
  });

  // try {
  //   const { email, password } = req.body;
  //   const user = await User.findOne({ email });
  //   if (user) {
  //     return res.status(409).json({
  //       status: 'error',
  //       code: 409,
  //       message: 'Already register',
  //     });
  //   }
  //   const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  //   await User.create({ email, password: hashPassword });
  //   // const result = await User.create({ email, password });
  //   res.status(201).json({
  //     status: 'success',
  //     code: 201,
  //     message: 'Success register',
  //   });
  // } catch (error) {
  //   next(error);
  // }
};

module.exports = register;
