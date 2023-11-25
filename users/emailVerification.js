import express from 'express';
import Joi from 'joi';
import userModel from '../models/userModel.js';
import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config();
const router = express.Router();

// Konfiguracja nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAILGUN_HOST,
  port: process.env.MAILGUN_PORT,
  auth: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASS,
  },
});

// Joi schema dla weryfikacji e-maila
const verifyEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

// Endpoint do obsługi weryfikacji e-maila
router.get('/verify/:verificationToken', async (req, res) => {
  const { verificationToken } = req.params;

  try {
    // Szukaj użytkownika po tokenie w bazie danych
    const user = await userModel.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Sprawdź, czy użytkownik nie był już wcześniej zweryfikowany
    if (user.verify) {
      return res.status(404).json({ message: 'Verification already passed' });
    }

    // Ustaw verificationToken na null i verify na true
    await user.updateOne(
      { $set: { verificationToken: null, verify: true } },
      { new: true }
    );

    return res.status(200).json({ message: 'Verification successful' });
  } catch (error) {
    console.error('Error during email verification:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint do ponownego wysyłania e-maila weryfikacyjnego
router.post('/verify', async (req, res) => {
  console.log('wszedłem');
  try {
    const { error } = verifyEmailSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Missing required field email' });
    }

    const { email } = req.body;

    // Sprawdź, czy użytkownik istnieje w bazie danych
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Sprawdź, czy użytkownik nie był już wcześniej zweryfikowany
    if (user.verify) {
      return res
        .status(400)
        .json({ message: 'Verification has already been passed' });
    }

    /*   // Wygeneruj nowy verificationToken
    const newVerificationToken = generateUniqueToken(); */

    // Aktualizuj verificationToken w bazie danych
    /*     user.verificationToken = newVerificationToken;
    await user.save(); */

    // Wyślij e-mail z nowym verificationToken
    const mailOptions = {
      from: process.env.MAILGUN_USER,
      to: email,
      subject: 'Verification Email',
      text: `Click the following link to verify your email: localhost:3000/users/verify/${user.verificationToken}`, //http://yourapi.com/users/verify/${user.verificationToken}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Verification email sent' });
  } catch (error) {
    console.error('Error during email resend:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
/* 
// Funkcja do generowania unikalnego tokena
function generateUniqueToken() {
  const token = uuidv4();
  return token;
} */

export default router;
