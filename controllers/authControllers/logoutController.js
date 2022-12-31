const { User } = require("../../models/userModel.js");
const { Unauthorized } = require("http-errors");



//-----------------------------------------------------------------------------
const logoutController = async (req, res) => {
    console.table([req.user]);
    const { id: user_id } = req.user //?
    console.log("logoutController-->user_id:".bgBlue.yellow, user_id.red);
    let user = await User.findOne({ _id: user_id });
    // const user = await User.findOne({ _id: "63af43c0e58a51e95a2c9ffe" }); //! Проверка на ОШИБКУ Unauthorized 
    console.log("");
    console.log("nlogoutController-->user:".bgBlue.white, user);

    //! ОШИБКА Unauthorized - если такого user
    if (!user) {
        throw new Unauthorized("Not authorized");
    }

    //! Удаление токена
    console.log("logoutController-->user.token_ДО:".bgBlue.white, user.token);
    console.log("");
    user.token = ""
    //! Обновляем поле "token" в MongoDB --> db-contacts.users
    user = await User.findByIdAndUpdate(user._id, { token: "" }, { new: true });
    console.log("logoutController-->user.token_ПОСЛЕ:".bgBlue.red, user.token);

    res.status(200).json({
        status: "No Content",
        code: 204,
        user
    })
};


module.exports = logoutController



