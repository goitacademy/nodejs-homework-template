import { User } from "../models/index.js";
import { HttpError } from "../helpters/index.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const { JWT_SECRET } = process.env;