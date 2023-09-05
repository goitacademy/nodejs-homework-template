const asyncHandler = require('express-async-handler');

const getCurrent = asyncHandler(async (req, res) => {

    const { email, subscription } = req.user;
    
    res.status(200).json({
        email,
        subscription,
    })
 });

module.exports = getCurrent;