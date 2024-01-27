import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import Jimp from "jimp";
import path from "path";
import { promises as fsPromises } from "fs";
import { v4 as uuidv4 } from "uuid";
import User from "../models/userModel.js";

const uploadAvatar = async (req, res, next) => {
	try {
		const userId = req.user._id;

		// Sprawdź, czy załadowano plik
		if (!req.file) {
			return res.status(400).json({ message: "No file uploaded" });
		}

		// Opracuj załadowany awatar przy pomocy Jimp
		const imagePath = path.join(__dirname, `../tmp/${req.file.filename}`);
		const avatar = await Jimp.read(imagePath);
		await avatar.resize(250, 250).writeAsync(imagePath);

		// Przenieś awatar do folderu public/avatars i nadaj unikalną nazwę
		const avatarFileName = `${userId}-${uuidv4()}${path.extname(
			req.file.originalname
		)}`;
		const avatarPath = path.join(
			__dirname,
			`../public/avatars/${avatarFileName}`
		);
		await fsPromises.rename(imagePath, avatarPath);

		// Zaktualizuj pole avatarURL w bazie danych
		const avatarURL = `/avatars/${avatarFileName}`;
		await User.findByIdAndUpdate(userId, { avatarURL });

		// Usuń tymczasowy plik
		await fsPromises.unlink(avatarPath);

		res.status(200).json({ avatarURL });
	} catch (error) {
		next(error);
	}
};

export { uploadAvatar };
