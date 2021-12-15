// const { login } = require("../routes/services/userServices");
// const { addToken } = require("../routes/services/userServices");
// const express = require("express");
// const logger = require("morgan");
// const cors = require("cors");
// const { connectMongo } = require("../db/connection");
// const app = express();
// const PORT = process.env.PORT || 3001;
// const router = new express.Router();
// const formatsLogger = app.get("env") === "development" ? "dev" : "short";
// const { loginValidator } = require("../routes/middlewares/validation");
// app.use(logger(formatsLogger));
// app.use(cors());
// app.use(express.json());

// app.use("/api/users", router);
// const { asyncWrapper } = require("../routes/helpers/apiHelpers");
// router.post("/login", loginValidator, asyncWrapper(testLogin));

// const testLogin = async (req, res) => {
//   const { email, password } = req.body;
//   const token = await login(email, password);
//   await addToken(email, token);
//   res.status(200).json({
//     status: "Ok",
//     code: 200,
//     data: {
//       user: { email, subscription: "starter", token },
//     },
//   });
// };
// const start = async () => {
//   try {
//     await connectMongo();
//     app.listen(PORT, () => {
//       console.log(`Server running. Use our API on port: ${PORT}`);
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// start();
// module.exports = { testLogin };
