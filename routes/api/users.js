const express = require("express");


const router = express.Router();
const controller =require("../../controller/user.js");
const auth=require("../../middlewares/auth.js")

router.post("/signup", controller.signup)
router.post("/login", controller.login)
router.get("/logout",auth, controller.logout)
router.get("/current",auth, controller.current)




module.exports = router;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODg2OGQ3YThlNzQyZjlmNDgxYTY4ZiIsImlhdCI6MTY1MzE1NDY5MywiZXhwIjoxNjUzMTU4MjkzfQ.RAs7EEO8W8ufwhEW-EKZf1KGv7Q5t2qpKKmI11QUloc