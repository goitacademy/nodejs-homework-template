const { User, signupSchema } = require("../../models/user");
const { RequestError } = require("../../utils");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const getAvatarImageFileName = require("../../utils/getAvatarImageFileName");
const fs = require("fs/promises");
const path = require("path");
const getTempPath = require("../../utils/getTempPath");
const getAvatarsPath = require("../../utils/getAvatarsPath");
const resizeByJimp = require("../../utils/resizeByJimp");

const signup = async (req, res, next) => {
	try {
		const { error } = signupSchema.validate(req.body);
		if (error) throw RequestError(400, error.message);
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (user) throw RequestError(409, "Email in use");
		let avatarURL = req.file ? "temp" : gravatar.url(email);
		const hashPassword = await bcrypt.hash(password, 10);
		const result = await User.create({
			...req.body,
			password: hashPassword,
			avatarURL,
		});
		if (req.file) {
			await resizeByJimp(req);
			const fileName = getAvatarImageFileName(req, result._id);
			const tempPath = getTempPath(req);
			const avatarsPath = getAvatarsPath(fileName);
			await fs.rename(tempPath, avatarsPath);
			avatarURL = path.join("avatars", fileName);
			await User.findByIdAndUpdate(result._id, { avatarURL });
		}
		res.status(201).json({
			user: {
				email: result.email,
				subscription: result.subscription,
			},
		});
	} catch (error) {
		next(error);
	}
};

module.exports = signup;
