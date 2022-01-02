const {User} = require("../../models")
const bcrypt = require("bcryptjs")
const {Conflict} = require("http-errors")

const signUp = async (req, res) => {
    const {email, password, subscription} = req.body;
    const user = await User.findOne({email})
    if(user) {
       throw new Conflict(`User with ${email} already registred`)
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    const result = await User.create({email, password: hashPassword, subscription})
    res.status(201).json({
        status: "succes",
        code: 201,
        data: {
            user: {
                email,
                subscription
            }
        }
    })
}

module.exports = signUp