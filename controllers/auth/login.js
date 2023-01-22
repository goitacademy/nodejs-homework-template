const { User } = require("../../models/user");
const { HttpError } = require("../../helpers/HttpError");
const bcrypt = require("bcryptjs");
// const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");
 SECRET_KEY='jsjoksGYUJKklmm665'



const login = async (req, res) => {
    const { email, password } = req.body;
      const user = await User.findOne({ email });
   if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Unauthorized (`Email or password is wrong`)
  }
     const payload = {
    id: user._id
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({ token });

    res.status(200).json({
    token,
    user: {
      email: user.email,    
        subscription: user.subscription  
    
    }
  })
 }

module.exports = login