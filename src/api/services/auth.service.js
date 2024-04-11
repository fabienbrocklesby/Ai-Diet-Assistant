import bcrypt from "bcrypt";
import Model from "../models/auth.model.js";
import {
	validateUsername,
	validateEmail,
	validatePassword,
} from "../validators/user.validation.js";
import tokenMiddleware from "../middleware/jwt.middleware.js";
import emailHelper from "../helpers/email.helper.js";
import { generateOTP, verifyOTP } from "../helpers/otp.helper.js";

const saltRounds = 10;

export default {
	async register({ username, email, password }) {
		console.log(username);
		if (!username || !email || !password) {
			throw new Error(
				"Registration failed. Please ensure you have provided a username, email, and a password."
			);
		}

		try {
			await validateUsername({ username: username });
			await validateEmail({ email: email });
			await validatePassword({ password: password });
		} catch (error) {
			throw error;
		}

		const hashedPassword = await bcrypt.hash(password, saltRounds);

		password = hashedPassword;

		await emailHelper({
			email: email,
			message: `Thank you for registering, ${username}!`,
		});

		const otp = generateOTP();
		console.log(otp);

		const result = await Model.register({
			username,
			email,
			password,
			otp,
			otp_expires: new Date(Date.now() + 1000 * 60 * 60),
		});

		return result;
	},

	async login({ email, username, password }) {
		if ((!username && !email) || !password) {
			throw new Error(
				"Login failed. Please provide a username/email and a password."
			);
		}

		if (email) {
			await validateEmail({ email });
		} else {
			await validateUsername({ username });
		}
		await validatePassword({ password: password });

		const user = email
			? await Model.selectUserByEmail(email)
			: await Model.selectUserByUsername(username);

		if (!user) {
			throw new Error(
				"User not found. Please check your email/username and try again."
			);
		}

		const passwordMatch = await bcrypt.compare(password, user.password_hash);

		if (!passwordMatch) {
			throw new Error(
				"Invalid password. Please check your password and try again."
			);
		}

		console.log("User logged in:", username || email);

		const accessToken = tokenMiddleware.generateAccessToken({
			email: user.email,
			username: user.username,
		});

		return { message: "Logged in successfully!", user, accessToken };
	},

	async verifyEmail({ email, otp }) {
		if (!email || !otp) {
			throw new Error(
				"Verification failed. Please provide an email and an OTP."
			);
		}

		await validateEmail({ email });

		const user = await Model.selectUserByEmail(email);

		if (!user) {
			throw new Error("User not found. Please check your email and try again.");
		}

		if (user.email_verified) {
			throw new Error("Email already verified.");
		}

		const isOTPValid = verifyOTP(otp);

		if ((!isOTPValid, user.otp !== otp)) {
			throw new Error("Invalid OTP. Please check your OTP and try again.");
		} else if (user.otp_expires < new Date()) {
			throw new Error("OTP has expired. Please request a new OTP.");
		}

		const result = await Model.verifyEmail(email);

		return { message: "Email verified successfully!", result };
	},
};
