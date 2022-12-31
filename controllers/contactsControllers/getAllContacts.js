//? +++++++++++++++++++  mongoose +++++++++++++++++++
const { Contact } = require("../../models");
const { User } = require("../../models");

const { lineBreak } = require("../../services");


//-----------------------------------------------------------------------------
const getAllContacts = async (req, res, next) => {
    // const contacts = await Contact.find({});


    const { id: user_id } = req.user //?
    //* =============================console===================================
    console.log("getAllContacts-->req.user:".bgYellow.red); //?
    console.table(req.user); //?
    console.table([req.user]);

    console.log("getAllContacts-->user_id:".bgYellow.blue, user_id.bgGreen.blue); //?
    console.log("");
    //* =======================================================================


    //? ============================ Пагинация ================================
    let {
        skip = 0,
        limit = 5
    } = req.query;

    // skip = parseInt(skip); //! работает и без этого
    // limit = parseInt(limit); //! работает и без этого
    // limit = limit > 2 ? 2 : limit //! будет показано только: 2 контакта (поста)
    //? =======================================================================


    // const contacts = await Contact.find({ owner: user_id }); //*
    //? Пагинация
    const contacts = await Contact.find({ owner: user_id, skip, limit })
        .select({ createdAt: 0 })   //! не показывать поле "createdAt"
        .skip(skip)   //! с какого элемента массива (объекта) начать показ
        .limit(limit)   //! сколько элементов массива (объекта) показать
        .sort("name") //! сортировка по полю "name"
    // .sort({ "favorite": true }) //! сортировка по полю "name"


    //? ========================== Aggregation ================================
    const users = await User.aggregate([
        {
            '$lookup': {
                'from': 'contacts',
                'localField': '_id',
                'foreignField': 'owner',
                'as': 'userContacts'
            }
        }
    ])
    //? =======================================================================



    //! ===========================console============================
    console.log("START-->GET/All".green); //!
    lineBreak();
    console.log("СОРТИРОВАННЫЙ СПИСОК ВСЕХ КОНТАКТОВ USER с id:".bgGreen.black, user_id.bgGreen.blue)
    console.log(contacts); //!!!!!

    //? Aggregation
    console.log("\n------------------------- СПИСОК ВСЕХ USERS и их КОНТАКТОВ: --------------------------".bgCyan.black);
    console.log("");
    for (let i = 0; i < users.length; i++) {
        const id = String(users[i].id)
        // console.log("id:", id); //!
        console.log("");
        console.log("СПИСОК ВСЕХ КОНТАКТОВ USER с id:".bgGreen.black, id.bgRed.black)
        console.log(users[i]); //!!!!!
        // if (users[i].userContacts.length) {
        //     console.log("СПИСОК ВСЕХ КОНТАКТОВ:".bgMagenta.black)
        //     console.log(users[i].userContacts); //!!!!!
        // }
    }

    lineBreak();
    console.log("END-->GET/All".green); //!
    lineBreak();
    //! ==============================================================


    res.status(200).json({
        status: "success",
        code: 200,
        data: { contacts },
        //? Aggregation
        data: { users },
        //? Пагинация
        skip,
        limit
    });
};

module.exports = getAllContacts;









//todo ---------- OLD ------------------------
// const { Contact } = require("../../models");


// //-----------------------------------------------------------------------------
// const getAllContacts = async (req, res, next) => {
//     const contacts = await Contact.find({});

//     res.status(200).json({
//         status: "success",
//         code: 200,
//         data: { contacts }
//     });
// };

// module.exports = getAllContacts;
