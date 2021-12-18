const {Unauthorized} = require("http-errors");

const {User} = require("../../model");

const logout = async(req, res) => {
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");

    const user = await User.findOne({token});

    if(!user){
        throw new Unauthorized();
    }
    await User.findByIdAndUpdate(user._id, { token: null })
    res.json({
        status: "success",
        code: 204,
    })
}   

module.exports = logout