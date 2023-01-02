const { User } = require("../../models/userModel.js");
const { Unauthorized } = require("http-errors");



//-----------------------------------------------------------------------------
const logoutController = async (req, res) => {
    // console.table([req.user]);
    console.log(req.user);

    const { id: userId } = req.user
    console.log("logoutController-->userId:".bgBlue.yellow, userId.red);


    // await User.findByIdAndUpdate({_id: userId, token: null });  //! сразу удаляем

    // let user = await User.findOne({ _id: userId }); //! 1-вариант
    // const user = await User.findOne({ _id: "63af43c0e58a51e95a2c9ffe" }); //! Проверка на ОШИБКУ Unauthorized 

    let user = await User.findById({ _id: userId }); //! 2-вариант
    // const user = await User.findById({ _id: "63af43c0e58a51e95a2c9ffe" }); //! Проверка на ОШИБКУ Unauthorized

    console.log("");
    console.log("nlogoutController-->user:".bgBlue.white, user);

    //! ОШИБКА Unauthorized - если нет такого user
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
    console.log("");

    res.status(204).json()

    // res.status(200).json({
    //     status: "No Content",
    //     code: 204,
    //     user
    // })
};


module.exports = logoutController