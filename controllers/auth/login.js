const { User } = require("../../models/user");
const { HttpError } = require("../../helpers/HttpError");
const bcrypt = require("bcryptjs");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");
 



const login = async (req, res) => {
    const { email, password } = req.body;
      const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password invalid");
  
      
  }
      const passwordCompare = await bcrypt.compare(password, user.password);
   if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }
  if (!user.verify) {
    throw HttpError(401, "Email not verify");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
   res.json({ token });

    //  const payload = {
    // id: user._id
    // }
    // const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    // await User.findByIdAndUpdate(user._id, { token });
    // res.json({ token });

  //   res.status(200).json({
  //   token,
  //   user: {
  //     email: user.email,    
  //       subscription: user.subscription  
    
  //   }
  // })
 }

module.exports = login