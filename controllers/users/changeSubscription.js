const {NotFound} = require("http-errors");
const {User} = require("../../models");

async function changeSubscription(req, res) {
    const { subscription } = req.body;
    const {_id} = req.user;
    const user = await User.findByIdAndUpdate(_id, { subscription }, { new: true });
    if (!user) {
        throw new NotFound(`Not found`);
    }
    res.json({
        status: "Success",
        code: 200,
        data: {
            result: user
        }
    });
}

module.exports = changeSubscription;