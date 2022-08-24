const express = require('express');
const ctrl = require("../../controllers/users");
const {ctrlWrapper} = require("../../helpers");
const {auth} = require("../../middlewares");
<<<<<<< Updated upstream
const {upload} = require("../../middlewares/upload");
=======
const upload = require("../../middlewares/upload");
>>>>>>> Stashed changes
const router = express.Router();

router.post("/signup", ctrlWrapper(ctrl.signup));
router.post("/login", ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));

<<<<<<< Updated upstream
module.exports = router;
=======
module.exports = router; 
>>>>>>> Stashed changes

