const User = require("../../models/usersSchema.js");
const requestError = require("../../utils/requestError.js");

const userLogout = async (req, res, next) => {
    const {_id} = req.user;
    const userExist = await User.findByIdAndUpdate(_id, {token:" "}, {new: true});;
    if(!userExist){
        const errorUserExist = requestError(401, "Not authorized" );
        throw errorUserExist;
    }
    
    res.status(204).json("No Content");
}

module.exports = userLogout;