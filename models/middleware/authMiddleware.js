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

		req.user = user;
		next();
	} catch (error) {
		res.status(401).json({ message: "Not authorized" });
	}
};

export default authenticateUser;
