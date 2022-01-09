
const {User} = require("../../models")
const {Unauthorized} = require("http-errors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {SECRET_KEY} = process.env


const login = async(req,res) => {
 const {email, password} = req.body;
 const user = await(User.findOne({email}))

if(!user || !user.comparePassword(password)) {
    throw new Unauthorized("Wrong password or email")
}

const payload = {
    id: user.id
}
const token = jwt.sign(payload, SECRET_KEY)
await User.findByIdAndUpdate(user.id, {token})

res.json({
    status: "succes",
    code: 200,
    data: {
        token,
        user:{
            email: user.email,
            subscription: user.subscription,
            avatar: user.avatarUrl
        }
    }
})
}



module.exports = login