const sendVerificationEmail = require('../services/emailService');
const { v4: uuidv4 } = require('uuid');

const registerUser = async (req, res) => {
  const { email } = req.body;
  const verificationToken = uuidv4();

  // Logika zapisu użytkownika w bazie danych z verificationToken

  await sendVerificationEmail(email, verificationToken);

  res.status(201).json({ message: 'Registration successful. Check your email for verification.' });
};
