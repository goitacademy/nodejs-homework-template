const {ctrlWrapper} = require("../../helpers/index");



const getCurrent = async(req, res) => {
    const {username, email} = req.user;

    res.send({username, email});
};


module.exports = {
    getCurrent: ctrlWrapper(getCurrent)
};