// const bcrypt = require('bcryptjs')
const {User} = require('../../models')

const register = async(req, res, next) => {
    try {
        const {email, password} = req.body
       
        const user = await User.findOne({email});

        if(user){
            return res.status(409).json({
                status: "conflict",
                code: 409,
                message: "Email in use"  
            })
        }
        // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        // const result = await User.create({email, password:hashPassword })

        const newUser = new User({email})
        newUser.setPassword(password)
        await newUser.save();
       res.status(201).json({
            status: "succes",
            code: 201,
            users: {
                email: email,
                subscription: "starter"
              } 
        })
    }
    catch(err){
        next(err)
    }
}
module.exports = register

