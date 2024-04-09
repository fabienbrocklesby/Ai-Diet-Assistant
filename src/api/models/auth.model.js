import db from "../utils/db.js";

export default {
	async register({ username, email, password }) {
		const result = await db.query(
			"INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
			[username, email, password]
		);

		return result.rows[0];
	},

	async login() {
		return "Login";
	},
};
