const express = require("express");
const router = express.Router();
const {
  get,
  getById,
  create,
  remove,
  update,
  changeStatus,
} = require("../../controller");
const passport = require("passport");

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "unauthorized",
        data: "unauthorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

router.get("/", auth, get);

router.get("/:id", auth, getById);

router.post("/", auth, create);

router.delete("/:id", auth, remove);

router.put("/:id", auth, update);

router.patch("/:id/favorite", auth, changeStatus);
module.exports = router;
