const { User } = require("../../models/user");
const { RequestError } = require("../../utils");

const current = async (req, res, next) => {
	try {
		const user = await User.findOne({ _id: req.userId });
		if (!user) throw RequestError(401);
		res.status(200).json({ email: user.email });
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = current;
