const User = require("../../models/users");
const {Unauthorized} = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { HttpError } = require("../../helpers");

const {SECRET_KEY} = process.env;

const login = async (req, res) => {   
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const subscription = user.subscription;
    const passCompare = bcrypt.compareSync(password, user.password);
            
        if (!user || !passCompare) {
            throw Unauthorized("Email or password is wrong");
    }

    if (!user.verify) {
            throw HttpError(400, "Email is not verify")
    }
    
        const paylod = {
            id: user._id
    };
  
    const token = jwt.sign(paylod, process.env.SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, {token})
        res.json({
            status: "OK",
            code: 200,
            ResponseBody: {
                token,
                user: {
                    email,
                    subscription
                }
            }
        })

}


module.exports = login;