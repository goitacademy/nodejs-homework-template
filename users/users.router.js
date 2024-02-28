const { Router } = require("express");
const usersController = require("./users.controller");
const { userValidatorMiddleware } = require("./users.validators");
const { authMiddleware } = require("../auth/auth.middleware");
const User = require("./user.model");

const usersRouter = Router();

// Endpoint dla weryfikacji użytkownika na podstawie tokena weryfikacyjnego
usersRouter.get("/verify/:verificationToken", async (req, res) => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken });

    // Jeśli użytkownik nie został znaleziony, zwracamy błąd 404
    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }

    // Aktualizujemy pola użytkownika
    user.verify = true; // Użytkownik zostaje zweryfikowany
    user.verificationToken = null; // Usuwamy token weryfikacyjny
    await user.save();

    return res.status(200).json({ message: "Weryfikacja udana" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Wewnętrzny błąd serwera" });
  }
});

// Endpoint dla ponownego wysłania emaila weryfikacyjnego
usersRouter.post("/verify", async (req, res) => {
  const { email } = req.body;

  // Sprawdzamy, czy podano adres email
  if (!email) {
    return res.status(400).json({ message: "Brak wymaganego pola email" });
  }

  try {
    const user = await User.findOne({ email });

    // Sprawdzamy, czy użytkownik istnieje
    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }

    // Sprawdzamy, czy użytkownik jest już zweryfikowany
    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Weryfikacja została już przeprowadzona" });
    }

    // Tutaj należy dodać logikę generowania i wysyłania emaila weryfikacyjnego
    // z nowym user.verificationToken i odnośnikiem do '/users/verify/:verificationToken'

    return res
      .status(200)
      .json({ message: "Email weryfikacyjny został wysłany" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Wewnętrzny błąd serwera" });
  }
});

usersRouter.post(
  "/signup",
  userValidatorMiddleware,
  usersController.signupHandler
);
usersRouter.post(
  "/login",
  userValidatorMiddleware,
  usersController.loginHandler
);
usersRouter.post("/logout", authMiddleware, usersController.logoutHandler);
usersRouter.get("/current", authMiddleware, usersController.currentHandler);

usersRouter.patch(
  "/avatars",
  usersController.upload.single("avatar"),
  authMiddleware,
  usersController.avatarPatchHandler
);

module.exports = {
  usersRouter,
};
