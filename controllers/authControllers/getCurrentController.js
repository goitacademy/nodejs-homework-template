const { User } = require("../../models/userModel.js");
const { Unauthorized } = require("http-errors");


//-----------------------------------------------------------------------------
const getCurrentController = async (req, res) => {
    console.log(""); //!
    // console.table([req.user]); //!
    console.log("getCurrentController-->req.user:".bgBlue.yellow, req.user); //!
    console.log("getCurrentController-->req.user._id:".bgBlue.yellow, req.user._id);
    const { id: user_id } = req.user
    console.log("getCurrentController-->user_id:".bgBlue.yellow, user_id.red); //!
    const user = await User.findOne({ _id: user_id });
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
        status: "No getCurrentController",
        code: 200,
        user: {
            email,
            subscription
        }
    })
};


module.exports = getCurrentController
