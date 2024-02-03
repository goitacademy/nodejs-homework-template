import express  from "express";

const router = express.Router()

router.post("/register", (req, res) => {
    res.json("ok");
})


export default router;