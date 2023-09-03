const User = require("../models/user.model");
const jwt = require("jsonwebtoken")

const signin = async (req, res) => {
      const { email, password } = req.body;
 const user = await User.findOne({ email });

 if (!user || !user.validPassword(password)) {
		return res.status(400).json({
			status: "error",
			code: 400,
			message: "Incorrect login or password",
			data: "Bad request",
		});
 }

 const payload = {
		id: user.id,
		username: user.username,
 };

 const token = jwt.sign(payload, secret, { expiresIn: "1h" });
 res.json({
		status: "success",
		code: 200,
		data: {
			token,
		},
 });
}

const signout = (req, res) => {
    
}

const signup = async (req, res, next) => {
     const { email, password } = req.body;
     const user = await User.findOne({ email }).lean();
  if (user) {
    return res.status(409).json({
      status: 'error',
      code: 409,
      message: 'Email is already in use',
      data: 'Conflict',
    });
  }
  try {
    const newUser = new User({ username, email });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        message: 'Registration successful',
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
    signin,
    signout,
    signup,
};