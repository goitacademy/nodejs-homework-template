const {Conflict} = require("http-errors");

const {User} = require("../../models");

const register = async(req, res)=> {
    const {name, email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
        throw new Conflict(`User with ${email} already exist`)
    }
    const newUser = new User({name, email});

    newUser.setPassword(password);

    newUser.save();
    res.status(201).json({
        status: "suc",
        code: 201,
        data: {
            user: {
                email,
                name
            }
        }
    });
}

module.exports = register;