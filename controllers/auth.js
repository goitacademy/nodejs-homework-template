

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();



const { SECRET_KEY } = process.env;




const { User } = require("../models/user");

const { ctrlWrapper, ResponseError } = require("../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
   const user = await User.findOne({ email });

  if (user) {
    throw ResponseError(409, "Email in use");
}
    const hashPassword = await bcrypt.hash(password, 10);  

    const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
      user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
    
  });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    

    if (!user) {
        throw ResponseError(401, "Email or password is wrong");
    }
   
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw ResponseError(401, "Email or password is wrong");
    }

    const payload = {
        id: user._id
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    res.json({
        token,
        user: {
            email:user.email,
            subscription:user.subscription
        }

    })

}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
};
