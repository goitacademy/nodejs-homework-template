/* eslint-disable no-empty */
const bcrypt = require('bcryptjs');
const { BadRequest } = require('http-errors');
const { User } = require('../../models');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequest('Wrong email');
    // res.status(400).json({
    //   status: 'error',
    //   code: 400,
    //   message: 'Wrong email',
    // });
  }
  const hashPassword = user.password;
  const compareResult = bcrypt.compareSync(password, hashPassword);
  if (!compareResult) {
    throw new BadRequest('Wrong password');
    // return res.status(400).json({
    //   status: 'error',
    //   code: 400,
    //   message: 'Wrong password',
    // });
  }
  const token = 'fhfsfgs.dfgsfhfhh.dfddsadfff';
  res.json({
    token,
  });

  // try {
  //   const { email, password } = req.body;
  //   const user = await User.findOne({ email });
  //   if (!user) {
  //     res.status(400).json({
  //       status: 'error',
  //       code: 400,
  //       message: 'Wrong email',
  //     });
  //   }
  //   const hashPassword = user.password;
  //   const compareResult = bcrypt.compareSync(password, hashPassword);
  //   if (!compareResult) {
  //     return res.status(400).json({
  //       status: 'error',
  //       code: 400,
  //       message: 'Wrong password',
  //     });
  //   }
  //   const token = 'fhfsfgs.dfgsfhfhh.dfddsadfff';
  //   res.json({
  //     token,
  //   });
  // } catch (error) {
  //   next(error);
  // }
};

module.exports = login;
