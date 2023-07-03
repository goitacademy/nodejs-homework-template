const { User } = require("../../models/users");

const { HttpError } = require("../../helpers/HttpError");

const register = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if(user){
    throw HttpError(409, "Email already exist")
  }
  
  const newUser = await User.create(req.body);

  res.status(201);
  res.json({
    email: newUser.email,
    // subscription: newUser.subscription,
  });
};

module.exports = register;
