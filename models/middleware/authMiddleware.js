import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authenticateUser = async (req, res, next) => {
	try {
		const token = req.header("Authorization").replace("Bearer ", "");
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findOne({ _id: decoded.userId, token });

		if (!user) {
			throw new Error("Not authorized");
		}

		req.user = {
			_id: user._id,
			email: user.email,
			subscription: user.subscription,
			avatarURL: user.avatarURL,
		};

		next();
	} catch (error) {
		res.status(401).json({ message: "Not authorized" });
	}
};

export default authenticateUser;
