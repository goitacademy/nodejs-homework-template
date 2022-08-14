const { User } = require("../../models")
const {NotFound} = require("http-errors")
const vertifyEmail = async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        throw NotFound()
    }
    await User.findByIdAndUpdate(user._id,{ verify: true, vertificationToken: null })
    res.json({
        message: "Verify sucsess"
    })
}
module.exports = vertifyEmail
