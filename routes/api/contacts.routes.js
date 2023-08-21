const express = require("express");
const router = express.Router();
const passport = require("passport");
const contactsController = require("../../controller/contacts.controller");

const auth = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
        
    if (!user || err) {
      return res
        .status(401)
        .header("Content-Type", "application/json")
        .json({
          status: "unauthorized",
          code: 401,
          ResponseBody: {
            message: "Not authorized",
          },
        });
    }
    req.user = user;
    next();
  })(req, res, next);
};

router.get("/contacts", auth, contactsController.get);

router.get("/contacts/:id", auth, contactsController.getById);

router.post("/contacts", auth, contactsController.create);

router.put("/contacts/:id", auth, contactsController.update);

router.patch("/contacts/:id/favorite", auth, contactsController.updateFavorite);

router.delete("/contacts/:id", auth, contactsController.remove);

module.exports = router;
