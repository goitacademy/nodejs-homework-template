const jwt = require('jsonwebtoken');
const User = require("../../models/userModel");
const { AppError } = require("../../utils");

const login = async (req, res, next) => {
    const { email, password } = req.body;

    const logedUser = await User.findOne({ email }).select('+password');
    if (!logedUser) return next(new AppError(401, 'Email or password is wrong'));

    const passwordIsValid = await logedUser.checkPassword(password, logedUser.password);
    if (!passwordIsValid) return next(new AppError(401, 'Email or password is wrong. Not authorized'));

    logedUser.password = undefined;

    const payload = {
        id: logedUser._id
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TERMIN });
    const newUser = await User.findByIdAndUpdate(logedUser._id, {token});
  console.log(token);

    res.status(200).json({
    status: "success",
    code: 200,
    data: { user: newUser },
  });
}

module.exports = login;