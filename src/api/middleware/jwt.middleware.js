import jwt from "jsonwebtoken";

const generateAccessToken = (payload) =>
	jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

const verifyAccessToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res
			.status(401)
			.json({ message: "Unauthorized: Access token is missing" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		return res
			.status(403)
			.json({ message: "Forbidden: Invalid or expired token" });
	}
};

export default {
	generateAccessToken,
	verifyAccessToken,
};
