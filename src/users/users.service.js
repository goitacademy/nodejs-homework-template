const {NotFound}= require('http-errors')

const { UserModel } = require("../db/users.model")

const getCurrentUser = async(userId)=>{

    const user = await UserModel.findById(userId);
    if(!user){
        throw new NotFound("Not authorized")
    }
    return user;
}
exports.getCurrentUser=getCurrentUser