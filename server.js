import { app } from "./app.js";
import colors from "colors";

app.listen(3000, () => {
  console.log(
    `${colors.cyan("[server]")} Server running. Use our API on port: 3000`
  );
});
