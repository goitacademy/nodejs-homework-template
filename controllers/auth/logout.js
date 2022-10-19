const { User } = require("../../models/user");
const { RequestError } = require("../../utils");

const logout = async (req, res, next) => {
	try {
		const user = await User.findOne({ _id: req.userId });
		if (!user) throw RequestError(401);
		await User.findByIdAndUpdate(user._id, { token: null });
		console.log("afterFindById");
		res.status(204).json();
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = logout;
