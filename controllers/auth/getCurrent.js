const {ctrlWrapper} = require("../../helpers/index");



const getCurrent = async(req, res) => {
    const {username, email, subscription} = req.user;

    res.send({username, email, subscription});
};


module.exports = {
    getCurrent: ctrlWrapper(getCurrent)
};