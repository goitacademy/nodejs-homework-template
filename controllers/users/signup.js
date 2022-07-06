const { User } = require('../../models/users');
const bcrypt = require('bcryptjs');

const signup = async(req, res) => {
    const { email, password} = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(409).json({
            status: "conflict",
            code:409,
// Content-Type: application/json,
data: {
  message: "Email in use"
}
        })
    }
    const hashPassword = bcrypt.hashSync(password,bcrypt.genSaltSync(10))
    const result= await User.create({ email, password:hashPassword});
    res.status(201).json({
        status: "created",
        code:201,

        data: {
  user: {
   email,
   subscription:user.subscription
  }
}
})

}

module.exports = signup