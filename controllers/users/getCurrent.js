const {ctrlWrapper} = require('../../helpers')

const getCurrent = async(req, res)=> {
    const {email} = req.user;
    
    res.status(200).json({
        "email": email,
        "subscription": "starter"
    })
}

module.exports = {
    getCurrent: ctrlWrapper(getCurrent),
}