import bcrypt from "bcrypt";
import Model from "../models/auth.model.js";
import {
	validateUsername,
	validateEmail,
	validatePassword,
} from "../validators/user.validation.js";

const saltRounds = 10;

export default {
	async register(userData) {
		if (!userData.username || !userData.email || !userData.password) {
			throw new Error(
				"Registration failed. Please ensure you have provided a username, email, and a password."
			);
		}

		try {
			await validateUsername({ username: userData.username });
			await validateEmail({ email: userData.email });
			await validatePassword({ password: userData.password });
		} catch (error) {
			throw error;
		}

		const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

		userData.password = hashedPassword;

		const result = await Model.register(userData);
		return result;
	},

	async login(userData) {
		if (!userData.username && !userData.email) {
			throw new Error(
				"Login failed. Please provide either a username or email."
			);
		}
		if (!userData.password) {
			throw new Error("Login failed. Please provide a password.");
		}

		try {
			const { email, username } = userData;
			if (email) {
				await validateEmail({ email });
			} else {
				await validateUsername({ username });
			}
			await validatePassword({ password: userData.password });
		} catch (error) {
			throw error;
		}

		const user = email
			? await Model.selectUserByEmail(email)
			: await Model.selectUserByUsername(username);

		if (!user) {
			throw new Error(
				"User not found. Please check your email/username and try again."
			);
		}

		const passwordMatch = await bcrypt.compare(
			userData.password,
			user.password_hash
		);

		if (!passwordMatch) {
			throw new Error(
				"Invalid password. Please check your password and try again."
			);
		}

		console.log("User logged in:", userData.username || userData.email);

		return { message: "Logged in successfully!", user };
	},
};
