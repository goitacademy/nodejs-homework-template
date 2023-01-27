const { User } = require("../../models/user");
const { HttpError } = require("../../helpers/HttpError");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { sendEmail } = require("../../helpers");
const {BASE_URL} = process.env;




const register = async (req, res) => {
  const { email, password } = req.body;
   const verificationCode = nanoid();
    
    const user = await User.findOne({ email });
      if (user) {
          throw HttpError(409, "Email in use");
          
    }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const avatarURL = gravatar.url(email);
  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL,verificationCode });
    
      res.status(201).json({
    name: newUser.name,
    email: newUser.email,
      });
  
   const verifyEmail = {
    to: email,
    subject: "Verify you email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`,
  };
  await sendEmail(verifyEmail);
  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
 }
module.exports = register