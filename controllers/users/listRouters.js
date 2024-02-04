import express from "express";

const router = express.Router()

router.get("/",  (req, res) => {
    // res.json(res.locals);
    return res.json(req.user);

})


export default router;