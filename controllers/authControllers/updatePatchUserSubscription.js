const { NotFound, BadRequest } = require('http-errors');
const { User } = require("../../models");

const { lineBreak } = require("../../services");


//-----------------------------------------------------------------------------
const updatePatchUserSubscription = async (req, res, next) => {
    console.log(""); //!

    const { id: userId, subscription: subscriptionReqUser } = req.user

    console.log("req.user --> userId:".bgBlue.yellow, userId); //!
    console.log("req.user --> subscriptionReqUser:".bgBlue.yellow, subscriptionReqUser); //!

    const { subscription } = req.body

    console.log("req.body --> subscription:".bgBlue.red, subscription); //!


    //! Проверка условия "Если body нет" - 2-ой вариант
    if (!(subscription === "starter" || subscription === "pro" || subscription === "business")) {
        throw new BadRequest("missing field favorite")
    }

    //* =============================console===================================
    console.log("updatePatchUserSubscription-->req.user:".bgYellow.red); //?
    // console.table(req.user); //?
    // console.table([req.user]);
    console.log(req.user);

    console.log("updatePatchUserSubscription-->userId:".bgYellow.blue, userId); //?
    console.log("");
    //* =======================================================================


    //! ===========================console============================
    console.log("START-->PATCH/:id/subscription".rainbow); //!
    lineBreak();
    //! ==============================================================

    const user = await User.findOneAndUpdate({ _id: userId }, { subscription }, { new: true });


    if (!user) {
        //! ===========================console============================
        console.log("Нет ПОЛЬЗОВАТЕЛЯ с таким ID:".yellow, userId.red); //!
        lineBreak();
        console.log("END-->PATCH/:id/subscription".rainbow); //!
        //! ==============================================================
        throw new NotFound(`Contact wiht id:'${userId}' not found`)
    }

    //! ===========================console============================
    console.log(`ОБНОВЛЕННЫЙ ПОЛЬЗОВАТЕЛЬ с ID: ${userId}:`.rainbow); //!
    console.log(user); //!
    lineBreak();
    console.log("END-->PATCH/:id/subscription".rainbow); //!
    lineBreak();
    //! ==============================================================

    res.status(200).json({
        status: "success",
        code: 200,
        data: { user }
    })
};

module.exports = updatePatchUserSubscription;