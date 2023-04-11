import app from './app.js';
import colors from "colors";

const PORT = 3000
app.listen(PORT, () => {
    console.log(colors.magenta(`[server] Server running on port ${PORT}`))
})