const app = require("../app");

const PORT = process.env.PORT || 3001;

// const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
	console.log(`Server running. Use our API on port: ${PORT}`);
});
