import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import routes from "./routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

dotenv.config();

const corsOptions = {
	origin: "*",
	credentials: true,
	optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(join(__dirname, "public")));

app.use(routes);

app.use((error, request, response, next) => {
	response.status(error.status || 500).json({
		message: error.message,
		stack: process.env.NODE_ENV === "development" ? error.stack : {},
	});
});

app.get("*", (req, res) => {
	res.sendFile(join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
