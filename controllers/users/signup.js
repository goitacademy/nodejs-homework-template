const { User } = require('../../models/users');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
// const jimp = require('jimp')
// const resizeAvatar = require('../../helpers/resizeAvatar')

const signup = async(req, res) => {
    const { email, password} = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(409).json({
            status: "conflict",
            code:409,
            data: {
              message: "Email in use"
              }
        })
    }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email)
  // const avatarURL = await resizeAvatar(avatar)

    const result= await User.create({ email, password:hashPassword,avatarURL});
    res.status(201).json({
        status: "created",
        code:201,

        data: {
    user: {
    email,
    subscription: result.subscription,
    avatarURL
  }
}
})

}

module.exports = signup