const { User } = require('../../models');
const { noContent } = require('../../lib').HTTP_RESPONSES;

const logout = async (req, res, next) => {
        const {_id} = req.user;
        await User.findByIdAndUpdate(_id, {token: ''})
        res.status(noContent.code).send();
}

module.exports = logout;
