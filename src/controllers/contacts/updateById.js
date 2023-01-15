// const express = require("express");
// const router = express.Router();
// const { updateContact } = require("../../models");

// const updateById = router.put("/:contactId", async (req, res, next) => {
//   const body = req.body;
//   const data = await updateContact(body);
//   if (!data) {
//     return res.status(404).json({ error: "User does not exist" });
//   }
//   res.status(200).json({
//     status: "success",
//     code: 200,
//     data,
//   });
// });

// module.exports = updateById();