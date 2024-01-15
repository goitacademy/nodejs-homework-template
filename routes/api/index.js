const express = require("express");

const router = express.Router(); //Этот объект позволяет группировать обработчики маршрутов, связанные с определенными путями URL то есть создает страничку записной книжки, а не новую книжку

const contactRoutes = require("./contacts");
const authRoutes = require("./auth");

router.use("/contacts", contactRoutes);
router.use("/users", authRoutes);

module.exports = router;
