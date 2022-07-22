const {User} = require('../../models')
const {Conflict} = require("http-errors")
const bcrypt = require('bcryptjs')
const signUp = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
        throw new Conflict( "Email in use")
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    const result = await User.create({email, password: hashPassword})
    
    res.status(201).json({
        "user": {
            "email": email,
            "subscription": result.subscription
        }
    })
}

module.exports = signUp