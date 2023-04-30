const {Conflict} = require("http-errors");
const bcrypt = require("bcryptjs");

const {User} = require("../../models");

const register = async(req, res) => {
    const {name, email, password, subscription} = req.body;
    const user = await User.findOne({email});
    if(user){
        throw new Conflict(`User with ${email} already exist`)
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    const result = await User.create({name, email, subscription, password: hashPassword});
    console.log(result)
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            user: {
                email,
                name,
                subscription
            }
            
        }
        
    })

}

module.exports = register;