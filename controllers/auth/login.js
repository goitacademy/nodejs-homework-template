const { User } = require("../../models/user");
const {Unauthorized} = require('http-errors')
const bcrypt = require('bcryptjs')
require("dotenv").config()
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { email, password } = req.body;
   
    const user = await User.findOne({ email });

    const comparePass = bcrypt.compareSync(password, user.password)

    if (!comparePass || !user) {
         throw new Unauthorized("Email or password is wrong")
       
       
    }
    const payload = {
    id:user._id
    }
   const subscription = user.subscription
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn:"10h"} )
   await User.findByIdAndUpdate(user._id, {token})
    res.json({
        status: "success",
        code: 200,
        ResponseBody: {
  token: token,
  user: {
      email,
     subscription
  }
}

    })
}

module.exports = login;