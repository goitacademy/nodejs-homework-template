const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const jwt = require("jsonwebtoken");

const {SECRET_KEY} = process.env;

const updateSubscription = async (req, res) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    const {id} = jwt.verify(token, SECRET_KEY);
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if(!user) {
        throw RequestError(404, "Not found");
    }
    res.json({
        _id: user.id,
        email: user.email,
        subscription: user.subscription
    });
}

module.exports = updateSubscription;