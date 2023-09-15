const {
	addUser,
	findUserByMail,
	setJwtInDb,
	deleteJwtInDb,
	pathAvatarInDb,
  } = require('../service/usersMongo');
  const {
	newUserJoiValidation,
	logUserJoiValidation,
  } = require('../service/usersJoi');
  const {
	passwordHashBcypt,
	passwordCompareBcrypt,
  } = require('../service/bcrypt');
  const { createToken } = require('../service/jwtCreation');
  
  const { avatarUrl } = require('../service/gravatar');
  const { jimpedAvatar } = require('../service/jimpAvatar');
  const {
	tmpFolder,
	writeTmpFile,
  } = require('../service/fileHandling');
  const {nanoid} = require('nanoid')
  
  const signUp = async (req, res, next) => {
	const { password, email } = req.body;
	const avatar = avatarUrl(email);
	console.log(avatarUrl(email));
	try {
	  await newUserJoiValidation(password, email);
	  try {
		const hashedPassword = await passwordHashBcypt(password);
		const user = await addUser(hashedPassword, email, avatar);
		return res.status(201).json({
		  user: {
			email: user.email,
			subscription: user.subscription,
		  },
		});
	  } catch (err) {
		return res.status(409).json({ message: 'Email in use by Mongo' });
	  }
	} catch (err) {
	  return res.status(400).json({ message: err.message });
	}
  };
  
  const logIn = async (req, res, next) => {
	const { password, email } = req.body;
	try {
	  await logUserJoiValidation(password, email);
	} catch (err) {
	  return res.status(400).json({ message: err.message });
	}
	try {
	  const user = await findUserByMail(email);
	  const isPassCorrect = await passwordCompareBcrypt(password, user.password);
	  if (user && isPassCorrect) {
		const id = user._id.toString();
		const payload = { id: user._id };
		const token = createToken(payload);
		const newToken = { token: token };
		const setToken = await setJwtInDb(id, newToken);
		return res.json({
		  token: setToken.token,
		  user: {
			email: user.email,
			subscription: user.subscription,
		  },
		});
	  } else {
		throw new Error('Wrong password');
	  }
	} catch (err) {
	  return res.status(401).json({ message: 'Email or password is wrong' });
	}
  };
  
  const logOut = async (req, res, next) => {
	const { _id } = req.user;
	await deleteJwtInDb(_id.toString());
	return res.status(204).end();
  };
  
  const current = (req, res, next) => {
	const { email, subscription } = req.user;
	return res.json({ email: email, subscription: subscription });
  };
  
  const updateAvatar = async (req, res, next) => {
	const { _id } = req.user;
	const { originalname } = req.file;
	const finalFileName = `${nanoid()}_${originalname}`;
	const tmp = tmpFolder(originalname);
	try {
	  await jimpedAvatar(tmp, 'tmp/' + originalname);
	  await writeTmpFile(originalname, finalFileName);
	  const saveUrl = `${req.url}/${finalFileName}`;
	  const dbUrl = await pathAvatarInDb(_id, { avatarUrl: saveUrl });
	  return res.json({ avatarUrl: dbUrl.avatarUrl });
	} catch (err) {
	  console.log(err);
  
	  return res.status(401).json({ message: 'Not authorized' });
	}
  };
  module.exports = { signUp, logIn, logOut, current, updateAvatar };