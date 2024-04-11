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

	async register({ username, email, password, otp, otp_expires }) {
		const {
			rows: [user],
		} = await db.query(
			"INSERT INTO users (username, email, password_hash, otp, otp_expires) VALUES ($1, $2, $3, $4, $5) RETURNING *",
			[username, email, password, otp, otp_expires]
		);

		return user;
	},

	async verifyEmail(email) {
		const {
			rows: [user],
		} = await db.query(
			"UPDATE users SET email_verified = true, otp = NULL, otp_expires = NULL WHERE email = $1 RETURNING *",
			[email]
		);

		return user;
	},
};
