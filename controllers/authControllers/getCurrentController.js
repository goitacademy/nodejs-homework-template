const { User } = require("../../models/userModel.js");
const { Unauthorized } = require("http-errors");


//-----------------------------------------------------------------------------
const getCurrentController = async (req, res) => {
    console.log(""); //!
    // console.table([req.user]); //!
    console.log("getCurrentController-->req.user:".bgBlue.yellow, req.user); //!
    console.log("getCurrentController-->req.user._id:".bgBlue.yellow, req.user._id);
    const { id: userId } = req.user
    console.log("getCurrentController-->userId:".bgBlue.yellow, userId.red); //!
    const user = await User.findOne({ _id: userId });
    // const user = await User.findOne({ _id: "63af43c0e58a51e95a2c9ffe" }); //! Проверка на ОШИБКУ Unauthorized 
    console.log(""); //!
    console.log("getCurrentController-->user:".bgBlue.yellow, user); //!
    console.log(""); //!

    //! ОШИБКА Unauthorized - если нет такого user
    if (!user) {
        throw new Unauthorized("Not authorized");
    }
    const { email, subscription } = user;

    res.status(200).json({
        // status: "success",
        code: 200,
        user: {
            email,
            subscription
        }
    })
};


module.exports = getCurrentController
