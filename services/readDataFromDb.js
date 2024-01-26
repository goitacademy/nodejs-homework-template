import { User } from "../models/schemas/userSchema.js";

export async function readDataFromDb() {
  try {
    const data = await User.find();
    return data;
  } catch (err) {
    console.error("Error reading data from database:", err);
    throw err;
  }
}
