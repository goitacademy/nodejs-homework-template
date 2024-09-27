const User = require('../../models/user');


const subscription = async (req, res) => {
    const { subscription } = req.body;
    const result = User.updateOne({ subscription });
    // console.log(result)

    res.json(result)
}

module.exports = subscription;