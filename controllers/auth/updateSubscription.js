const { RequestError } = require('../../helpers');
const { User } = require('../../models/user');

const updateSubscription = async (req, res, next) => {
    const { id } = req.user;

    const result = await User.findByIdAndUpdate(id, req.body, {
        new: true,
    });

    if (!result) {
        throw RequestError(404, 'Not found');
    }
    res.json(result);
};

module.exports = updateSubscription;
