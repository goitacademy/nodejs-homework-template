const express = require("express");
const router = express.Router;
const jsonParser = express.json;

router.post("/users/register", jsonParser);
