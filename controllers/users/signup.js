const { Conflict } = require("http-errors");
// const bcrypt = require("bcryptjs");
const { User } = require("../../models");

const signup = async (req, res) => {
    const { name, email, password, subscription } = req.body;
    const user = await User.findOne({email});
    if (user) {
        throw new Conflict(`email ${email} in use!`);
    }
    const newUser = new User({
        name,
        email,
        subscription,
        
    });
    /*
    newUser = {
    name,
    email,
    setPassword(password) {
            this.password = bcrypt.hashPassword(
                password,
                bcrypt.genSaltSync(10)
                )
        }    
    }
    */
    newUser.setPassword(password);
    /*
    newUser = {
    name,
    email,
    password,
    setPassword(password) {
            this.password = bcrypt.hashPassword(
                password,
                bcrypt.genSaltSync(10)
                )
        }    
    }
    */
    newUser.save();
    // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    // const result = await User.create({ name, email, password: hashPassword });
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            user: {
                name,
                email,
                subscription,
            },
        },
    });
};

module.exports = signup;