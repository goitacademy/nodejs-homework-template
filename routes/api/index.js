const express = require("express");
const router = express.Router();

<<<<<<< Updated upstream
const auth = require("../../middleware/user")

const contactsRouter = require("./contacts");
router.use("/contacts", auth, contactsRouter);

const usersRouter = require("./auth");
router.use("/users", usersRouter);
=======
const contactsRouter = require("./contacts");
const authRouter = require("./auth");

router.use("/contacts", contactsRouter);
router.use("/users", authRouter);
>>>>>>> Stashed changes

module.exports = router;
