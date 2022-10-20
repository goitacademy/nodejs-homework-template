const express = require("express");
const { downloadDir } = require("../../middlewares/uploadMiddleware");

const router = new express.Router();

router.use("/download", express.static(downloadDir));

router.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/contacts/download/filename",
    data: "Not found",
  });
});

module.exports = router;
