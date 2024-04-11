import db from "../utils/db.js";

export default {
	async selectUserByEmail(email) {
		console.log(email);
		const {
			rows: [user],
		} = await db.query("SELECT * FROM USERS WHERE email = $1", [email]);

		return user;
	},

	async selectUserByUsername(username) {
		const {
			rows: [user],
		} = await db.query("SELECT * FROM USERS WHERE username = $1", [username]);

		return user;
	},

	async register({ username, email, password }) {
		const {
			rows: [user],
		} = await db.query(
			"INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
			[username, email, password]
		);

		return user;
	},

	async login(data) {
		return { Login: data };
	},
};
