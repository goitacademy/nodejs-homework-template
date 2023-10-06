const express = require("express"); // шмпорт модулю express

const {
  handleGetAll,
  handleContactById,
  handleAddNewContact,
  handleDeleteContactById,
  handleUpdataContactById,
} = require("../../controllers/contactsController");

// створення окремого роуту в API за допомогою виклику методу Router з модулю express
const router = express.Router();

// створення окремих шляхів та їх обробкини
router.get("/", handleGetAll);

router.get("/:id", handleContactById);

router.post("/", handleAddNewContact);

router.delete("/:id", handleDeleteContactById);

router.put("/:id", handleUpdataContactById);

module.exports = router;
