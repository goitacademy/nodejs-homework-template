const {User} = require("../../models")
const {NotFound} = require("http-errors")

const verify = async(req, res) => {

    const {verificationToken} = req.params
    const user = await User.findOne({verificationToken})

    if (!user) {
        throw NotFound()
    }

    await User.findByIdAndUpdate(user.id, {verify: true, verificationToken: null})

    res.json({
        status:"succes",
        code: 200,
        message: "Verification successful"
    })
}


module.exports = verify