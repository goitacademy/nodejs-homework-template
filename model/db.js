import { join } from "path";
import { Low, JSONFile } from "lowdb";

// Use JSON file for storage
const file = join(__dirname, "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);
