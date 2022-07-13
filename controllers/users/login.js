const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../../models/users')
const {SECRET_KEY} = process.env





const login = async (req,res ) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    const passCompare = bcrypt.compareSync(password, user.password)
    if (!user || !passCompare) {
        return res.status(401).json({
            code: 401,
            status: "unauthorized",
            data: {
                message: "Email or password is wrong"
            }
        })    
    }
    const payload = {
        id:user._id
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" })
    await User.findByIdAndUpdate(user._id, {token})
    res.json({
        status: "success",
        code: 200,
        data: {
            token,
            user: {
                email,
                subscription:user.subscription
            }
        }
    })
    

}
    
    





module.exports = login