import { User } from "../models/schemas/userSchema.js";

export async function writeDataToDb(data) {
  try {
    const user = new User({ ...data });
    await user.save();
    console.log("Data successfully written to the database.");
  } catch (err) {
    console.error("Error writing data to the database:", err);
    throw err;
  }
}
