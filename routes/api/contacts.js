const express = require("express"); // шмпорт модулю express

const {
  handleGetAll,
  handleContactById,
  handleAddNewContact,
  handleDeleteContactById,
  handleUpdataContactById,
  handleUpdataFavourite,
} = require("../../controllers/contactsController");
const isValid = require("../../helpers/isValideObjId");

// створення окремого роуту в API за допомогою виклику методу Router з модулю express
const router = express.Router();

// створення окремих шляхів та їх обробкини
router.get("/", handleGetAll);

router.get("/:id", isValid, handleContactById);

router.post("/", handleAddNewContact);

router.delete("/:id", isValid, handleDeleteContactById);

router.put("/:id", isValid, handleUpdataContactById);

router.patch("/:id/favorite", isValid, handleUpdataFavourite);

module.exports = router;
