const { userValidator } = require("./../utils/validators/validator");
const service = require("../service/users");
const jwt = require("jsonwebtoken");
const User = require("../service/schemas/user");
require("dotenv").config();
