const { User } = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const {SECRET_KEY}= process.env
const {Unauthorized} = require('http-errors')
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
      if (!user || !user.verify) {
        throw new Unauthorized("Email is wrong")
      }
    const passCompare = bcrypt.compareSync(password, user.password)
    if (!passCompare || !user.verify) {
         throw new Unauthorized("Password is wrong")
    }
    const payload = {
        id: user._id
    }
  const token = jwt.sign(payload, SECRET_KEY)
  await User.findByIdAndUpdate(user._id,{token})
    res.json({
        code: 200,
     "token":  token,
      "user": {
        "email": email,
          "subscription": user.subscription}
    })
}
module.exports = login