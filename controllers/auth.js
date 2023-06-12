const User = require('../models/user');
// const { HttpError } = require('../helpers');
// const ctrlWrapper = require('../middlewares/ctrlWrapper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw res.status(409).json({ message: 'Email in use' });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });
    console.log(`newUser`,newUser)
    console.log(`user` , req.body.name )

    res.status(201).json({
      user :  {
        email: newUser.email,
        subscription: newUser.subscription
      }
    })


  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`401 error : !user `);
      throw res.status(401).json({ message: 'Email or pass invalid' });
    }
    const passwoedCompare = await bcrypt.compare(password, user.password);
    if (!passwoedCompare) {
      console.log(`401 error : !passwoedCompar`);
      throw res.status(401).json({ message: 'Email or pass invalid' });
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
    console.log(token)

    res.status(200).json({ token ,  user : {email,password} });
  } catch (error) {
    next(error);
  }
};

const logOut = async (req,res,next) => {
  try {
    
  } catch (error) {
    next(error)
  }
}
const currentUser = async (req,res,next) => { 
  try {
  
  } catch (error) {
    next(error)
  }
}
module.exports = { register, login ,logOut,currentUser};
