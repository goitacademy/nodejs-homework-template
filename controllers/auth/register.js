const userSubscriptionEnum = require("../../constans/userSubscriptionEnum");
const uuid = require("uuid").v4;

const User = require("../../models/userModel");

const Email = require("../../services/emailSevrice");

const register = async (req, res, next) => {
  const verificationToken = uuid();
  const newUserData = {
    ...req.body,
    verificationToken: verificationToken,
    subscription: userSubscriptionEnum.STARTER,
  };
  const newUser = await User.create(newUserData);

  
  try {
    await new Email(newUser, `http://localhost:3000/api/users/verify/${newUser.verificationToken}`).sendVerifyEmail2();
  } catch (error) {
    console.log(error, 'Ошибка здесь');
  }

  newUser.password = undefined;
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: newUser,
      
    },
  });
};

module.exports = register;