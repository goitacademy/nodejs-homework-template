const {  catchAsyns } = require("../utilitie");
const { User } = require("../models/userModel");

const updateSubscription = async(req,res) =>{
    const { id } = req.params;
    const user = await User.findById(id, "-createdAt -updatedAt -password")

    const userData = req.body;
    Object.keys(userData).forEach((key) => {
        user[key] = userData[key];
      });
    
       user.save();

      res.status(200).json({
        status: "success",
        code: 200,
        user: user,
      });
}

module.exports = {
    updateSubscription: catchAsyns(updateSubscription),
  };