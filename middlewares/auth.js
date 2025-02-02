import passport from "passport";
import mongoose from "mongoose";
import { UserModel } from "../models/users/userShema.js";

export const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }

    // Pobierz token z nagłówka `Authorization`
    const tokenFromHeader = req.headers.authorization?.split(" ")[1];
    if (!tokenFromHeader) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // Sprawdź, czy token w bazie danych jest zgodny z tokenem w nagłówku
    try {
      if (!mongoose.Types.ObjectId.isValid(user._id)) {
        console.error(`Invalid ID format: ${contactId}`.bgRed);
        return res.status(400).json({
          message: "Bad Request: Invalid User.ID format",
        });
      }

      const userFromDb = await UserModel.findById(user._id); // Znajdź użytkownika w bazie danych
      if (!userFromDb || userFromDb.token !== tokenFromHeader) {
        return res.status(401).json({
          message: "Not authorized",
        });
      }

      req.user = userFromDb; // Przekaż użytkownika do kolejnych middleware'ów
      next();
    } catch (dbError) {
      console.log(`Database error occurred: ${dbError} [auth.js]`.bgRed);
      return res.status(500).json({
        message: "Database error during token verification",
      });
    }
  })(req, res, next);
};
