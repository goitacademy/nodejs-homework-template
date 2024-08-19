import "colors";
import app from "./app.js";

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running. Use our API on port: ${port}`.cyan);
});
