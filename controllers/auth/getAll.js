const {User} = require('../../models');

const getAll = async(req, res) =>{
    const allUsers = await User.find();
    res.json({
        status: "success",
        code: 200,
        data: {
            result: allUsers
        }
    });
}

module.exports = getAll;