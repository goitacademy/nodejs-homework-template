const asyncHandler = require('express-async-handler');
const { User } = require('../../models/user');
const {schemas} = require('../../models/user');
const { HttpError } = require('../../helpers');


const updateSubscription = asyncHandler(async (req, res, next) => {
    
    const { _id } = req.user;

    const { error } = schemas.subscriptionSchema.validate(req.body);

    if (error) {
        next(HttpError(400, error.message));
    };

    const result = await User.findByIdAndUpdate(_id, { ...req.body }, {new:true});
    
    res.json(result);
})

module.exports = updateSubscription;