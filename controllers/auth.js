const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");
const { nanoid } = require("nanoid");


const {User} = require("../models/user");

const {
    HttpError,
    ctrlWrapper,
	sendEmail,
} = require('../helpers');

const {SECRET_KEY, BASE_URL} = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user){
        throw HttpError(409,"Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10);
	const avatarURL = gravatar.url(email, { s: "250", d: "retro" });
	const verificationCode = nanoid();

    const newUser = await User.create({...req.body, password: hashPassword, avatarURL, verificationCode});
	const verifyEmail = {
		to: email,
		subject: "Verify email",
		html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationCode}">Click to verifying email</a>`,
	}
	await sendEmail(verifyEmail);

    res.status(201).json({
		user:{
			email: newUser.email,
		    subscription: newUser.subscription,
		}
    })
}

const verifyEmail = async (req, res) => {
	const { verificationCode } = req.params;
	const user = await User.findOne({ verificationCode });
	if (!user) {
		throw HttpError(401, "Email is not found");
	}
	await User.findByIdAndUpdate(user._id, {
		verify: true,
		verificationCode: "",
	});

	res.json({
		message: "Email verified successfully",
	});
};

const resendVerifyEmail = async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		throw HttpError(401, "Email not found");
	}
	if (user.verify) {
		throw HttpError(401, "Email is already verified");
	}

	const verifyEmail = {
		to: email,
		subject: "Verify email",
		html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationCode}">Click verify email</a>`,
	};

	await sendEmail(verifyEmail);

	res.json({
		message: "Email verified successfully",
	});
};


const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		throw HttpError(401, "Email or password invalid");
	}
	if (!user.verify) {
		throw HttpError(401, "Email is not verified");
	}
	const passwordCompare = await bcrypt.compare(password, user.password);
	if (!passwordCompare) {
		throw HttpError(401, "Email or password invalid");
	}

	const payload = {
		id: user._id,
	};

	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
	await User.findByIdAndUpdate(user._id, { token });

	res.status(200).json({
		token,
		user: {
			email: user.email,
			subscription: user.subscription,
		},
	});
};

const getCurrent = async(req, res) => {
	const {email, subscription} = req.user;

	res.json({
		email,
		subscription,
	})
}

const logout = async(req, res) => {
	const {_id} = req.user;
	await User.findByIdAndUpdate(_id, {token: ""});

	res.status(204).end();
}

const cropImage = async (path) => {
	const image = await jimp.read(path);

	await image
		.autocrop()
		.cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE)
		.writeAsync(path);
};

const updateAvatar = async(req, res) => {
	const {_id} = req.user; 
	const {path: tempUpload, originalname} = req.file;
	await cropImage(tempUpload);
	const filename = `${_id}_${originalname}`;
	const resultUpload = path.join(avatarsDir, filename);
	await fs.rename(tempUpload, resultUpload);
	const avatarURL = path.join("avatars", filename);
	await User.findByIdAndUpdate(_id, {avatarURL});
	
	res.json({
		avatarURL,
	})
}



module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
	getCurrent: ctrlWrapper(getCurrent),
	logout: ctrlWrapper(logout),
	updateAvatar: ctrlWrapper(updateAvatar),
	verifyEmail: ctrlWrapper(verifyEmail),
	resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
}