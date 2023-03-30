const router = require("express").Router();

const contactsRouter = require("./contacts");
const registerRouter = require("./register");
const loginRouter = require("./login");
const logoutRouter = require("./logout");
const currentRouter = require("./current");

router.use("/api/contacts", contactsRouter);
router.use("/api/users", registerRouter);
router.use("/api/users", loginRouter);
router.use("/api/users", logoutRouter);
router.use("/api/users", currentRouter);
module.exports = router;
