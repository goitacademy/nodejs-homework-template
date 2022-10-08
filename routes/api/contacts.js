const express = require("express");

const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

const contacts = require("../../models/contacts");

// сука якщо в масиві нечайно лишня кома то це говно єбане не хочу перевіряти його, що за нах?

// і може убрати провірку на меіл так як без ком і нет воно не пропускає за сильно для начала може

//якогось бена коли помилка воно не прокидає потрібний стату а кидає 500 розібратись з цим говном

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrlWrapper(ctrl.getById));
//ебана валідація емайла  сука поміняй це говно єбане
router.post("/", ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.deleteById));

router.put("/:contactId", ctrlWrapper(ctrl.updateById) );

module.exports = router;
