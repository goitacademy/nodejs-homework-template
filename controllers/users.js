const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const fs = require('fs/promises');
const path = require('path');
const jimp = require('jimp');
const User = require('../models/user');

const { SECRET_KEY } = process.env;
const avatarsDir = path.join(__dirname, '../public/avatars');

// Rejestracja użytkownika
const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({ message: 'Email in use' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: '250' }); // Generowanie awatara z gravatar

  const newUser = await User.create({
    email,
    password: hashedPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

// Logowanie użytkownika
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Email or password is wrong' });
  }

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
  user.token = token;
  await user.save();

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
};

// Wylogowanie użytkownika
const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).send();
};

// Pobranie danych aktualnego użytkownika
const getCurrentUser = async (req, res) => {
  const { email, subscription, avatarURL } = req.user;
  res.json({ email, subscription, avatarURL });
};

// Aktualizacja awatara
const updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const { path: tempUpload, originalname } = req.file;
    const { _id } = req.user;

    const uniqueName = `${_id}-${Date.now()}${path.extname(originalname)}`;
    const resultUpload = path.join(avatarsDir, uniqueName);

    const image = await jimp.read(tempUpload);
    await image.resize(250, 250).writeAsync(resultUpload);

    await fs.unlink(tempUpload);

    const avatarURL = `/avatars/${uniqueName}`;

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { avatarURL },
      { new: true }
    );

    res.json({
      avatarURL: `${req.protocol}://${req.get('host')}${avatarURL}`,
    });
  } catch (error) {
    res.status(500).json({ message: 'Błąd podczas aktualizacji awatara.' });
  }
};

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
  updateAvatar,
};
