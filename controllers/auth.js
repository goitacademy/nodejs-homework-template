const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const jwtSecret = process.env.JWT_SECRET;

if (!process.env.JWT_SECRET) {
  console.error("Brak wartości dla JWT_SECRET");
  process.exit(1);
}

// Endpoint rejestracji użytkownika
async function signup(req, res) {
  try {
    const { email, password } = req.body;

    // Sprawdź, czy użytkownik o podanym adresie email już istnieje
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    // Haszuj hasło przed zapisaniem go w bazie danych
    const hashedPassword = await bcrypt.hash(password, 10);

    // Utwórz nowego użytkownika w bazie danych
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Usuń pole z tokenem z odpowiedzi
    delete newUser.token;

    res.status(201).json({
      user: { email: newUser.email, subscription: newUser.subscription },
    });
  } catch (error) {
    console.error("Błąd rejestracji", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Endpoint logowania użytkownika
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Znajdź użytkownika po adresie email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    // Porównaj hasło z haszem w bazie danych
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    // Ustal zawartość payload
    const payload = { userId: user._id };

    // Wygeneruj token JWT
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "5min",
    });

    res.status(200).json({
      user: { email: user.email, subscription: user.subscription },
      token,
    });
  } catch (error) {
    console.error("Błąd logowania", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getCurrentUser(req, res) {
  try {
    // Odczytaj użytkownika z obiektu req
    const { user } = req;

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Błąd pobierania aktualnego użytkownika", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Wyloguj użytkownika
async function logout(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User is not logged in" });
    }

    // Wyzeruj token w obiekcie user, aby oznaczyć wylogowanie
    req.user.token = null;
    await req.user.save();

    res.status(204).end();
  } catch (error) {
    console.error("Błąd wylogowywania użytkownika", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  signup,
  login,
  getCurrentUser,
  logout,
};
