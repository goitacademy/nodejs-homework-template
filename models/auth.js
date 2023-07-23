const User  = require('./user');
const bcrypt = require('bcrypt')
const registerSchema = require("../routes/api/registerSchema");
const loginSchema = require("../routes/api/loginSchema");
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = process.env



const register = async (userData) => {
  const { name, email, password } = userData;

  
  const validationResult = registerSchema.validate({ name, email, password });
  if (validationResult.error) {
    throw new Error(validationResult.error.message);
  }

  const user = await User.findOne({ email });
  if (user) {
    throw new Error("Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashPassword });

  return {
    email: newUser.email,
    subscription: "starter"
  };
};
  
  



  const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const { error } = loginSchema.validate({ email, password });
      if (error) { 
        return res.status(400).json({ message: error.details[0].message });
      }
  
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(401).json({ message: "Email or password is wrong" });
      }
  
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(401).json({ message: "Email or password is wrong" });
      }
  

      const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
        expiresIn: "24h",
      });
  
      res.json({
        token,
        user: {
          email: user.email,
          subscription: "starter" 
        },
      });
    } catch (err) {
      
      res.status(500).json({ message: "Server error" });
    }
  };
  



  const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Выход из системы прошел успешно" });
  };




const current = (req, res) => {
const {email, name} = req.user;
res.json(
  {email,
  name,}
)
}

  module.exports = { register,
login, logout, current};



