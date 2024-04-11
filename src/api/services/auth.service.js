import bcrypt from "bcrypt";
import Model from "../models/auth.model.js";

const saltRounds = 10;

export default {
	async register(userData) {
		if (!userData.username || !userData.email || !userData.password) {
			throw new Error(
				"Registration failed. Please ensure you have provided a username, email, and a password."
			);
		}

		const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

		userData.password = hashedPassword;

		const result = await Model.register(userData);
		return result;
	},

	async login(userData) {
		if (!(userData.username || userData.email) || !userData.password) {
			throw new Error(
				"Login failed. Please ensure you have provided either a username or email, and a password."
			);
		}

		const user = userData.email
			? await Model.selectUserByEmail(userData.email)
			: await Model.selectUserByUsername(userData.username);

		if (!user) {
			throw new Error(
				"User not found. Please check your email/username and try again."
			);
		}

		console.log(userData, user);

		return user;
	},
};
