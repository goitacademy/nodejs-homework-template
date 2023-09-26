const express = require("express");
const bodyParser = require('body-parser'); 
const logger = require("morgan");
const cors = require("cors");
const contactsRouter = require("./express/routes/contacts");
const userRouter = require("./express/routes/user")
const cookieParser = require('cookie-parser');
const port = 3000;
const app = express();
const passport = require('passport');
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(bodyParser.json());
app.use(logger(formatsLogger));
app.use(cors());
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));



app.use("/api/contacts", contactsRouter);
app.use("/api/user",userRouter)

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});


app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
    console.log(`Server running. Use our API on port: ${port}`)
  })
  
