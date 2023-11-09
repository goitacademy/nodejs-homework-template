import connectDB from "./db.js";
import "dotenv/config";
import app from "./app.js";

connectDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
