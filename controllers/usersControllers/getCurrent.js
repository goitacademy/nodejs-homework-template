const User = require('../../models/users');
const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
    // console.log(`GET_CURRENT${req.user}`)
    res.json({
        status: "success",
        code: 200,
        data: {
            user: {
               email, subscription
           }
       }
       
    })
}
module.exports = getCurrent;