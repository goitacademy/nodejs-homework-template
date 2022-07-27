const bcrypt = require("bcrypt");
const {User, schemas} = require("../../models/user");

const {createError} = require("../../helpers");

const login = async(req, res) =>{
    const {error} = schemas.login.validate(req.body);
    if(error){
        throw createError(400, error.message);
    }
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw createError(401, "Email or password is wrong");
    }
    const comparePassword =  await bcrypt.compare(password, user.password);
    if(!comparePassword){
        throw createError(401, "Email or password is wrong")
    }         
    const token = "hfsfg.asdsdgsfg.2224eh";
    res.status(200).json({
        token,
        user: {
            email: user.email,
        // subscription: "starter",
        }
    })
}

module.exports = login;